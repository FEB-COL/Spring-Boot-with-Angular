package co.fuziontek.web.rest;

import co.fuziontek.security.jwt.JWTTokenAlfesco;
import co.fuziontek.service.AlfrescoSiteService;
import co.fuziontek.service.AlfrescoUtilService;
import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearFilesService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearFilesDTO;
import com.fasterxml.jackson.databind.util.ObjectBuffer;
import io.github.jhipster.web.util.ResponseUtil;
import org.codehaus.jettison.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for managing GearFiles.
 */
@RestController
@RequestMapping("/api")
public class GearFilesResource {

    private final Logger log = LoggerFactory.getLogger(GearFilesResource.class);

    private static final String ENTITY_NAME = "gearFiles";

    private final GearFilesService gearFilesService;

    //Configuracion de Servicio de Alfresco
    @Autowired
    private AlfrescoUtilService alfrescoUtilService;

    @Autowired
    private JWTTokenAlfesco jwtToken;

    public GearFilesResource(GearFilesService gearFilesService) {
        this.gearFilesService = gearFilesService;
    }
    @PostMapping("/gear-files/download")
    @Timed
    public Map<String, Object> fileDownload(@RequestParam(value = "idAlfrescoFile", required = false) String idNode )throws JSONException {
       Map<String, Object> result = new HashMap<>();

        //primer paso lo que haremos es la parte de obtencion de token
        ResponseEntity<String> response = alfrescoUtilService.setTokenAlfresco();
        log.debug("Imprime el resultado de toke mirar" + response.toString());
        if (response.getStatusCode() == HttpStatus.CREATED) {
                String auxResult = alfrescoUtilService.buildResourceURL("alfresco/api/-default-/public/alfresco/versions/1/nodes/" + idNode + "/renditions/doclib/content");
                result.put("status", 1);
                result.put("message", auxResult);
        }else {
            //Error en la parte de validacion de usuarios lo mas probable es que alfresco se halla caido ---> verificar servicio OJO
            result.put("status", 0);
            result.put("message", "Su cuenta se encuentra bloqueada por superar el límite de intentos permitidos.\n Contácte a su administrador");
            return result;
        }


       return result;
    }

    @PostMapping("/gear-files/upload")
    @Timed
    public Map<String, Object> fileUpload(@RequestParam(value = "file", required = false) MultipartFile file,
                                          @RequestParam(value = "title", required = false) String Titulo,
                                          @RequestParam(value = "description", required = false) String Description
//                                          @RequestParam(value = "domain", required = false) String Domain

    ) throws JSONException {
        Map<String, Object> result = new HashMap<>();

        Path currentRelativePath = Paths.get("");
        String s = currentRelativePath.toAbsolutePath().toString();
        System.out.println("Current relative path is: " + s);

        String node = new String();
        //primer paso lo que haremos es la parte de obtencion de token
        ResponseEntity<String> response = alfrescoUtilService.setTokenAlfresco();
        log.debug("Imprime el resultado de toke mirar" + response.toString());
        if (response.getStatusCode() == HttpStatus.CREATED) {
            //nodo contenedor para la captura del Id principal
            //consulta el ID de compoenentes de Alfresco llamado Sites OJO
            node = alfrescoUtilService.AlfrescoNodoPrincipal();
            //ya con esta parte verificamos que el sitio yamado Gear se haya creado de lo contrario avizamos para se crea ojo con esta parte
            //mira los sitios creado en alfresco hasta encontrar gear
            node = alfrescoUtilService.AlfrescoNodos(node, "gear");
            //buscar la carpeta general para encontras los archivos y de esta forma subir todo la documentacion
            node = alfrescoUtilService.AlfrescoNodos(node, "documentLibrary");
            //Ya con el id de la carpeta que vamos a guardar procedemos a guardar el documento

            ////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////PARAMETROS DEL DOCUMENTO
            ////////////////////////////////////////////////////////////////////////////////////////
            try {
                //Preparacion de documento
                String tempFileName = "./tmp/" + file.getOriginalFilename();
                FileOutputStream fo = new FileOutputStream(tempFileName);
                fo.write(file.getBytes());

                //Parametros de guradado de documento
                LinkedMultiValueMap<String, Object> map = new LinkedMultiValueMap<>();
                map.add("filedata", new FileSystemResource(tempFileName));
                // asinar el Directorio
                map.add("uploadDirectory", "/");
                // asignar la descripción
                map.add("cm:description", Description);
                map.add("name", file.getOriginalFilename());
                //map.add("gm:documentType", StringUtils.isNotBlank(fileUploadDtoGeneral.getDocumentType()) ? fileUploadDtoGeneral.getDocumentType() : "");
                map.add("cm:title", Titulo);
                map.add("cm:author", "Admin"); // cuando se tenga el usuario se colocar el verdadero autor TODO OJo con esto
                //map.add("gm:documentTitle", StringUtils.isNotBlank(fileUploadDtoGeneral.getDocumentTitle()) ? fileUploadDtoGeneral.getDocumentTitle() : "");
                //map.add("gm:isDraft", BooleanUtils.isTrue(fileUploadDtoGeneral.getDocumentIsDraft()));
                //map.add("gm:fileName", StringUtils.isNotBlank(fileUploadDtoGeneral.getDocumentName()) ? fileUploadDtoGeneral.getDocumentName() : "");
                //map.add("gm:notes", "Test Description");
                //map.add("gm:siteId", gearsSite.getSiteGuid());
                //map.add("gm:domainId", domain.getId());
                map.add("contenttype", "cm:content");
                map.add("renditions", "doclib");
                map.add("thumbnails", "doclib");
                map.add("overwrite", "false");
                //Parametos de Header
                HttpHeaders headersRequest = new HttpHeaders();
                headersRequest.setContentType(MediaType.MULTIPART_FORM_DATA);
                headersRequest.add("Authorization", "Basic " + jwtToken.getIdToken());

                HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<MultiValueMap<String, Object>>(map, headersRequest);

                response = alfrescoUtilService.RESTPostEntity("/alfresco/api/-default-/public/alfresco/versions/1/nodes/" + node + "/children", requestEntity, String.class);
                // Se elimina el archivo creado en la carpeta temporal
                File temp = new File(tempFileName);
                temp.delete();
                if (response.getStatusCode() == HttpStatus.CREATED) {
                    //esta el status (1) es cuando se crea correctamente
                    result.put("status", 1);
                    result.put("message", response);
                } else {

                    //esta es cuando el nombre esta repetido en gestor documental de alfresco
                    result.put("status", 2);
                    result.put("message", "Error en Subir el Documento, Nombre similares por favor escriba uno diferente");
                }
            } catch (IOException e) {
                result.put("status", 0);
                result.put("message", e.getMessage());
                e.printStackTrace();
            }
        } else {
            //Error en la parte de validacion de usuarios lo mas probable es que alfresco se halla caido ---> verificar servicio OJO
            result.put("status", 0);
            result.put("message", "Su cuenta se encuentra bloqueada por superar el límite de intentos permitidos.\n Contácte a su administrador");
            return result;
        }
        return result;
    }
    /**
     * POST  /gear-files : Create a new gearFiles.
     *
     * @param gearFilesDTO the gearFilesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearFilesDTO, or with status 400 (Bad Request) if the gearFiles has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-files")
    @Timed
    public ResponseEntity<GearFilesDTO> createGearFiles(@RequestBody GearFilesDTO gearFilesDTO) throws URISyntaxException {
        log.debug("REST request to save GearFiles : {}", gearFilesDTO);
        if (gearFilesDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearFiles cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearFilesDTO result = gearFilesService.save(gearFilesDTO);
        return ResponseEntity.created(new URI("/api/gear-files/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-files : Updates an existing gearFiles.
     *
     * @param gearFilesDTO the gearFilesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearFilesDTO,
     * or with status 400 (Bad Request) if the gearFilesDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearFilesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-files")
    @Timed
    public ResponseEntity<GearFilesDTO> updateGearFiles(@RequestBody GearFilesDTO gearFilesDTO) throws URISyntaxException {
        log.debug("REST request to update GearFiles : {}", gearFilesDTO);
        if (gearFilesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearFilesDTO result = gearFilesService.save(gearFilesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearFilesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-files : get all the gearFiles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearFiles in body
     */
    @GetMapping("/gear-files")
    @Timed
    public List<GearFilesDTO> getAllGearFiles() {
        log.debug("REST request to get all GearFiles");
        return gearFilesService.findAll();
    }

    /**
     * GET  /gear-files/:id : get the "id" gearFiles.
     *
     * @param id the id of the gearFilesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearFilesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-files/{id}")
    @Timed
    public ResponseEntity<GearFilesDTO> getGearFiles(@PathVariable Long id) {
        log.debug("REST request to get GearFiles : {}", id);
        Optional<GearFilesDTO> gearFilesDTO = gearFilesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearFilesDTO);
    }

    /**
     * DELETE  /gear-files/:id : delete the "id" gearFiles.
     *
     * @param id the id of the gearFilesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-files/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearFiles(@PathVariable Long id) {
        log.debug("REST request to delete GearFiles : {}", id);
        gearFilesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
