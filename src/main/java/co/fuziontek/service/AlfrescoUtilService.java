package co.fuziontek.service;

import co.fuziontek.config.ApplicationProperties;
import co.fuziontek.security.jwt.JWTTokenAlfesco;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
//para el manejo del tocker
//para el menejo de las url se va realizar quemado la direccion

@Component
public class AlfrescoUtilService {

    private final Logger log = LoggerFactory.getLogger(AlfrescoUtilService.class);

    private String admin_ticket;

    private final ApplicationProperties properties;

    @Autowired
    private JWTTokenAlfesco jwtToken;


    /**
     * Creado por FEB(Fabian Eduardo Bohorquez)
     * @param properties
     * @throws JSONException
     */
    public String AlfrescoNodoPrincipal() throws JSONException{
        String result = new String();
        ResponseEntity<String> nodePrincipal = RESTGet("alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children", String.class);
        JSONObject responsebody = new JSONObject(nodePrincipal.getBody());
        //obtengo todos los nodos
        JSONObject nodes = responsebody.getJSONObject("list");//.getJSONObject("entry");
        JSONArray nodesArray = nodes.getJSONArray("entries");
        for(int i = 0; i< nodesArray.length(); i++){
            JSONObject auxResource = nodesArray.getJSONObject(i).getJSONObject("entry");
            if(auxResource.getString("name").equals("Sites")){
                result = auxResource.getString("id");
            }
        }
        return result;
    }

    /**
     * Creado por FEB(Fabian Eduardo Bohorquez)
     * @param properties
     * @throws JSONException
     */
    public String AlfrescoNodos(String idNode, String comparation) throws JSONException{
        String result = new String();
        ResponseEntity<String> nodos = RESTGet("alfresco/api/-default-/public/alfresco/versions/1/nodes/"+ idNode +"/children?include=properties&", String.class);
        JSONObject responsebody = new JSONObject(nodos.getBody());
        //obtengo todos los nodos
        JSONObject nodes = responsebody.getJSONObject("list");//.getJSONObject("entry");
        JSONArray nodesArray = nodes.getJSONArray("entries");
        for(int i = 0; i< nodesArray.length(); i++){
            JSONObject auxResource = nodesArray.getJSONObject(i).getJSONObject("entry");
            if(auxResource.getString("name").equals(comparation)){
                result = auxResource.getString("id");
            }
        }
        return result;
    }

    public ResponseEntity<String> setTokenAlfresco() throws JSONException{
        JSONObject user = new JSONObject();
        //setea los valores de Administrador
        user.put("userId", "admin");
        user.put("password", "gear159357");
        ResponseEntity<String> response = RESTAnonymousPost("alfresco/api/-default-/public/authentication/versions/1/tickets", user.toString(),String.class);
        //Valida si la operacion de tocken con el logeo con el super usuario fue satisfactoria ojo con esta parte
        if (response.getStatusCode() == HttpStatus.CREATED) {
            JSONObject responsebody = new JSONObject(response.getBody());
            String token = new String(Base64.encode(responsebody.getJSONObject("entry").get("id").toString().getBytes()));
            // setear el Token
            jwtToken.setIdToken(token);
        }
        return response;
    }

    public AlfrescoUtilService(ApplicationProperties properties) throws JSONException {
        this.properties = properties;
        getAdminTicket();
    }

    /**
     * Conectar con alfresco
     * @throws JSONException
     */
    public void getAdminTicket() throws JSONException {
        JSONObject request = new JSONObject();
        request.put("userId", "admin");
        request.put("password", "gear159357");

        try{
            log.info("Alfresco Conectado");

            ResponseEntity<String> response = RESTAnonymousPost("alfresco/api/-default-/public/authentication/versions/1/tickets",request.toString(),String.class);
            JSONObject responsebody = new JSONObject(response.getBody());
            admin_ticket = new String(Base64.encode(responsebody.getJSONObject("entry").get("id").toString().getBytes()));



        }catch (Exception ex){
            log.info("Alfresco is not active or the connection couldn't be established");
        }
    }

    public String buildResourceURL(String path){
        return "http://"+ properties.getAlfrescoAddress() + ":" + properties.getAlfrescoPort() +"/" + path;
    }

    public <T> ResponseEntity<T> RESTAnonymousPost(String url, Object param, Class<T> responseType){
        log.debug("POST TO " + url);
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity entity = new HttpEntity(param, headers);
        return restTemplate.exchange(resourceUrl, HttpMethod.POST, entity, responseType);
    }



    /** viene de UserService RESTPost */
    public <T> ResponseEntity<T> RESTPost(String url, Object param, Class<T> responseType){
        log.debug("POST TO " + url);
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        log.debug(resourceUrl);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + jwtToken.getIdToken());
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity entity = new HttpEntity(param, headers);
        return restTemplate.exchange(resourceUrl, HttpMethod.POST, entity, responseType);
    }


    /** viene de User Service  RESTPUT*/
    public <T> ResponseEntity<T> RESTPut(String url, Object param, Class<T> responseType){
        log.debug("PUT TO " + url);
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + jwtToken.getIdToken());
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity entity = new HttpEntity(param, headers);
        return restTemplate.exchange(resourceUrl, HttpMethod.PUT, entity, responseType);
    }

    /**
     * Guardar en la direccion que especifice (Alfresco)
     * @param url
     * @param entity
     * @param responseType
     * @param <T>
     * @return
     */
    public <T> ResponseEntity<T> RESTPostEntity(String url, HttpEntity<MultiValueMap<String, Object>> entity, Class<T> responseType){
        log.debug("POST TO " + url);
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        return restTemplate.exchange(resourceUrl, HttpMethod.POST, entity, responseType);
    }

    public <T> ResponseEntity<T> RESTPutEntity(String url, HttpEntity<String> entity, Class<T> responseType){
        log.debug("PUT TO " + url);
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        return restTemplate.exchange(resourceUrl, HttpMethod.PUT, entity, responseType);
    }

    public <T> ResponseEntity<T> RESTPutEntityContent(String url, HttpEntity<FileSystemResource> entity, Class<T> responseType){
        log.debug("PUT TO " + url);
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        return restTemplate.exchange(resourceUrl, HttpMethod.PUT, entity, responseType);
    }

    public boolean validateTicket(String ticket){
        log.debug("VALIDATING TICKET " + ticket);
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL("alfresco/api/-default-/public/authentication/versions/1/tickets/-me-");
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + ticket);
        HttpEntity entity = new HttpEntity(headers);
        ResponseEntity<String> response = null;
        try{
            response = restTemplate.exchange(resourceUrl, HttpMethod.GET, entity, String.class);
        }catch(Exception ex){
            return false;
        }
        if (response !=null && response.getStatusCode() == HttpStatus.OK){
            return true;
        }else{
            return false;
        }

    }

    public <T> ResponseEntity<T> RESTGet(String url, Class<T> responseType){
        log.debug("GET TO " + url);
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + jwtToken.getIdToken());
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUrl, HttpMethod.GET, entity, responseType);
    }

    public <T> ResponseEntity<T> RESTGetHTML(String url, Class<T> responseType){
        log.debug("GET TO " + url);
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        Charset utf8 = Charset.forName("UTF-8");
        MediaType mediaType = new MediaType("text", "html", utf8);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + jwtToken.getIdToken());
        headers.setContentType(mediaType);
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUrl, HttpMethod.GET, entity, responseType);
    }

    public <T> ResponseEntity<T> RESTGetPNG(String url, Class<T> responseType){
        log.debug("GET TO " + url);
        List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
        messageConverters.add(new ByteArrayHttpMessageConverter());

        RestTemplate restTemplate = new RestTemplate(messageConverters);
        String resourceUrl = buildResourceURL(url);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + jwtToken.getIdToken());
        headers.setContentType(MediaType.IMAGE_PNG);
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUrl, HttpMethod.GET, entity, responseType);
    }

    public <T> ResponseEntity<T> RESTDelete(String url, Class<T> responseType){
        log.debug("DELETE TO " + url);
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + jwtToken.getIdToken());
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUrl, HttpMethod.DELETE, entity, responseType);
    }

    /**  llamado de GearUserService*/
    public <T> ResponseEntity<T> RESTAdminPost(String url, Object param, Class<T> responseType){
        log.debug("ADMIN POST TO " + url);
        if(!validateTicket(admin_ticket)){
            try {
                getAdminTicket();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + this.admin_ticket);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity entity = new HttpEntity(param, headers);
        return restTemplate.exchange(resourceUrl, HttpMethod.POST, entity, responseType);
    }

    public <T> ResponseEntity<T> RESTAdminGet(String url, Class<T> responseType){
        log.debug("ADMIN POST TO " + url);
        if(!validateTicket(admin_ticket)){
            try {
                getAdminTicket();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        RestTemplate restTemplate = new RestTemplate();
        String resourceUrl = buildResourceURL(url);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + this.admin_ticket);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUrl, HttpMethod.GET, entity, responseType);
    }
}
