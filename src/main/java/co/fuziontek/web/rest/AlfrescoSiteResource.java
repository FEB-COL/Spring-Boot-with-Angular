package co.fuziontek.web.rest;

import co.fuziontek.security.jwt.JWTTokenAlfesco;
import co.fuziontek.service.AlfrescoUtilService;
import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.AlfrescoSiteService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.AlfrescoSiteDTO;
import com.hazelcast.com.eclipsesource.json.JsonArray;
import io.github.jhipster.web.util.ResponseUtil;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.net.URI;
import java.net.URISyntaxException;

import java.nio.file.Path;
import java.nio.file.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
///importacion manual por FEB (Fabian Eduardo Bohorquez)
//importaciones de controladores Basicos creados Manuales OJO

import java.io.File;
import java.io.IOException;

import org.apache.http.client.*;
import org.apache.http.client.HttpClient.*;
import org.apache.http.client.methods.*;
import org.apache.http.client.params.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * REST controller for managing AlfrescoSite.
 */
@RestController
@RequestMapping("/api")
public class AlfrescoSiteResource {
    /*variables que utilizamos para el updatea de alfresco ojo*/
//    private final static String alfrescoUrl = "http://192.168.188.128:8080/alfresco";
    private final static String alfrescoUrl = "http://34.73.6.168:8080/alfresco";

    private final Logger log = LoggerFactory.getLogger(AlfrescoSiteResource.class);

    private static final String ENTITY_NAME = "alfrescoSite";

    private final AlfrescoSiteService alfrescoSiteService;

    //Configuracion de Servicio de Alfresco
    @Autowired
    private AlfrescoUtilService alfrescoUtilService;

    @Autowired
    private JWTTokenAlfesco jwtToken;

    public AlfrescoSiteResource(AlfrescoSiteService alfrescoSiteService) {
        this.alfrescoSiteService = alfrescoSiteService;
    }

    /**
     * POST  /alfresco-sites : Create a new alfrescoSite.
     *
     * @param alfrescoSiteDTO the alfrescoSiteDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new alfrescoSiteDTO, or with status 400 (Bad Request) if the alfrescoSite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/alfresco-sites")
    @Timed
    public ResponseEntity<AlfrescoSiteDTO> createAlfrescoSite(@RequestBody AlfrescoSiteDTO alfrescoSiteDTO) throws URISyntaxException {
        log.debug("REST request to save AlfrescoSite : {}", alfrescoSiteDTO);
        if (alfrescoSiteDTO.getId() != null) {
            throw new BadRequestAlertException("A new alfrescoSite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlfrescoSiteDTO result = alfrescoSiteService.save(alfrescoSiteDTO);
        return ResponseEntity.created(new URI("/api/alfresco-sites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /alfresco-sites : Updates an existing alfrescoSite.
     *
     * @param alfrescoSiteDTO the alfrescoSiteDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated alfrescoSiteDTO,
     * or with status 400 (Bad Request) if the alfrescoSiteDTO is not valid,
     * or with status 500 (Internal Server Error) if the alfrescoSiteDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/alfresco-sites")
    @Timed
    public ResponseEntity<AlfrescoSiteDTO> updateAlfrescoSite(@RequestBody AlfrescoSiteDTO alfrescoSiteDTO) throws URISyntaxException {
        log.debug("REST request to update AlfrescoSite : {}", alfrescoSiteDTO);
        if (alfrescoSiteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AlfrescoSiteDTO result = alfrescoSiteService.save(alfrescoSiteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, alfrescoSiteDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /alfresco-sites : get all the alfrescoSites.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of alfrescoSites in body
     */
    @GetMapping("/alfresco-sites")
    @Timed
    public List<AlfrescoSiteDTO> getAllAlfrescoSites() throws JSONException{
        log.debug("REST request to get all AlfrescoSites");
        return alfrescoSiteService.findAll();
    }

    /**
     * GET  /alfresco-sites/:id : get the "id" alfrescoSite.
     *
     * @param id the id of the alfrescoSiteDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the alfrescoSiteDTO, or with status 404 (Not Found)
     */
    @GetMapping("/alfresco-sites/{id}")
    @Timed
    public ResponseEntity<AlfrescoSiteDTO> getAlfrescoSite(@PathVariable Long id) {
        log.debug("REST request to get AlfrescoSite : {}", id);
        Optional<AlfrescoSiteDTO> alfrescoSiteDTO = alfrescoSiteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(alfrescoSiteDTO);
    }

    /**
     * DELETE  /alfresco-sites/:id : delete the "id" alfrescoSite.
     *
     * @param id the id of the alfrescoSiteDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/alfresco-sites/{id}")
    @Timed
    public ResponseEntity<Void> deleteAlfrescoSite(@PathVariable Long id) {
        log.debug("REST request to delete AlfrescoSite : {}", id);
        alfrescoSiteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
