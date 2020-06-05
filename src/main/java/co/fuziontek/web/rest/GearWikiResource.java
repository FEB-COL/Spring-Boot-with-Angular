package co.fuziontek.web.rest;

import co.fuziontek.service.AlfrescoUtilService;
import co.fuziontek.service.dto.WikiCustomDTO;
import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearWikiService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearWikiDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for managing GearWiki.
 */
@RestController
@RequestMapping("/api")
public class GearWikiResource {

    private final Logger log = LoggerFactory.getLogger(GearWikiResource.class);

    private static final String ENTITY_NAME = "gearWiki";

    private final GearWikiService gearWikiService;

    //Configuracion de Servicio de Alfresco
    @Autowired
    private AlfrescoUtilService alfrescoUtilService;


    public GearWikiResource(GearWikiService gearWikiService) {
        this.gearWikiService = gearWikiService;
    }

    /**
     * POST  /gear-wikis : Create a new gearWiki.
     *
     * @param gearWikiDTO the gearWikiDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearWikiDTO, or with status 400 (Bad Request) if the gearWiki has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-wikis")
    @Timed
    public ResponseEntity<GearWikiDTO> createGearWiki(@RequestBody GearWikiDTO gearWikiDTO) throws URISyntaxException {
        log.debug("REST request to save GearWiki : {}", gearWikiDTO);
        if (gearWikiDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearWiki cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearWikiDTO result = gearWikiService.save(gearWikiDTO);
        return ResponseEntity.created(new URI("/api/gear-wikis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-wikis : Updates an existing gearWiki.
     *
     * @param gearWikiDTO the gearWikiDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearWikiDTO,
     * or with status 400 (Bad Request) if the gearWikiDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearWikiDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-wikis")
    @Timed
    public ResponseEntity<GearWikiDTO> updateGearWiki(@RequestBody GearWikiDTO gearWikiDTO) throws URISyntaxException {
        log.debug("REST request to update GearWiki : {}", gearWikiDTO);
        if (gearWikiDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearWikiDTO result = gearWikiService.save(gearWikiDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearWikiDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-wikis : get all the gearWikis.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearWikis in body
     */
    @GetMapping("/gear-wikis")
    @Timed
    public List<GearWikiDTO> getAllGearWikis() {
        log.debug("REST request to get all GearWikis");
        return gearWikiService.findAll();
    }

    /**
     * GET  /gear-wikis/:id : get the "id" gearWiki.
     *
     * @param id the id of the gearWikiDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearWikiDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-wikis/{id}")
    @Timed
    public ResponseEntity<GearWikiDTO> getGearWiki(@PathVariable Long id) {
        log.debug("REST request to get GearWiki : {}", id);
        Optional<GearWikiDTO> gearWikiDTO = gearWikiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearWikiDTO);
    }

    /**
     * DELETE  /gear-wikis/:id : delete the "id" gearWiki.
     *
     * @param id the id of the gearWikiDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-wikis/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearWiki(@PathVariable Long id) {
        log.debug("REST request to delete GearWiki : {}", id);
        gearWikiService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }



    @PostMapping("gear-wikis/create")
//    public Map<String, Object> fileHTMLUpload(@RequestParam String wikiCustomDtoString, HttpServletRequest request) throws Exception {
    public Map<String, Object> fileHTMLUpload(@RequestParam(value = "file", required = false) MultipartFile file) throws Exception {

        final Logger log = LoggerFactory.getLogger("");

        Map<String, Object> result = new HashMap<>();
        log.debug("resultado {}", result);

        /** crear un nuevo mapper */
        ObjectMapper mapper = new ObjectMapper();


        /** servicio de login de Alfresco*/
        ResponseEntity<String> response =  alfrescoUtilService.setTokenAlfresco();









//        /** Campos adicionales custom field. **/
//        WikiCustomDTO wikiCustomDtos = mapper.readValue(wikiCustomDtoString, WikiCustomDTO.class);


//        if (wikiCustomDtos == null) {
//            result.put("status", 0);
//            result.put("message", "File is required");
//            throw new Exception("File is required");
//        }
//
//        try {
//
//            /** Se crea un nuevo archivo temporal con el file que llegó de la petición */
//            String tempFileName = "./tmp/" + URLEncoder.encode(wikiCustomDtos.getTitle(), "UTF-8") + ".html";
//            FileOutputStream fo = new FileOutputStream(tempFileName);
//
//
//            log.info("valor fo {}", fo);
//            fo.write(wikiCustomDtos.getContentWiki().getBytes());
//
//            LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
//            HttpHeaders headersRequest = new HttpHeaders();
//
//            Charset utf8 = Charset.forName("UTF-8");
//            MediaType mediaType1 = new MediaType(MediaType.MULTIPART_FORM_DATA, utf8);
//            headersRequest.setContentType(mediaType1);
//
//
//
//            map.add("filedata", new FileSystemResource(tempFileName));
//            map.add("cm:title", wikiCustomDtos.getTitle());
//            map.add("uploadDirectory", "/");
//            map.add("contenttype", "cm:content");
//            map.add("renditions", "doclib");
//            map.add("thumbnails", "doclib");
//            map.add("overwrite", "false");
//
//            log.info("valor map {}", map);
//
//
//            HttpEntity<MultiValueMap<String, Object>> requestEntity =
//                new HttpEntity<MultiValueMap<String, Object>>(map, headersRequest);
//
//            headersRequest.setContentType(MediaType.TEXT_HTML);
//            HttpEntity<FileSystemResource> requestEntityUpdate =
//                new HttpEntity<FileSystemResource>(new FileSystemResource(tempFileName), headersRequest);
//
//            result = wikiCustomService.saveCustomWiki(requestEntity, requestEntityUpdate,  wikiCustomDtos);
//
//            if (StringUtils.isNotBlank(wikiCustomDtos.getId())) {
//                LinkedMultiValueMap<String, Object> mapUploadProperties = new LinkedMultiValueMap<>();
//
//                JSONObject requestJson = new JSONObject();
//                JSONObject properties = new JSONObject();
//
//                properties.put("cm:title", wikiCustomDtos.getTitle());
//                requestJson.put("properties", properties);
//
//                // mapUploadProperties.add("properties", mapProperties);
//                MediaType mediaType = new MediaType(MediaType.APPLICATION_JSON, utf8);
//                headersRequest.setContentType(mediaType);
//                HttpEntity<String> requestEntityUpdateProperties =
//                    new HttpEntity<String>(requestJson.toString(), headersRequest);
//
//                ResponseEntity<String> responseUpdateProperties = alfrescoUtilService.RESTPutEntity("/alfresco/api/-default-/public/alfresco/versions/1/nodes/"+ wikiCustomDtos.getId(), requestEntityUpdateProperties, String.class);
//
//                if( responseUpdateProperties != null && responseUpdateProperties.getBody() != null  ) {
//                    final JSONObject obj = new JSONObject(responseUpdateProperties.getBody());
//                    if (obj != null && obj.getJSONObject("entry") != null) {
//
//                        final JSONObject entryData = obj.getJSONObject("entry");
//                    }
//                }
//            }
//
//            // Se elimina el archivo creado en la carpeta temporal
//            File temp = new File(tempFileName);
//            temp.delete();
//
//            result.put("status", 1);
//            result.put("message", "Se ha subido correctamente el archivo");

//        } catch (IOException e) {
//            result.put("status", 0);
//            result.put("message", e.getMessage());
//            e.printStackTrace();
//        }
//
        return result;
    }






}
