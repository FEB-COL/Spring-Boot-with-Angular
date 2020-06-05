package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearValueChainCategoryService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearValueChainCategoryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing GearValueChainCategory.
 */
@RestController
@RequestMapping("/api")
public class GearValueChainCategoryResource {

    private final Logger log = LoggerFactory.getLogger(GearValueChainCategoryResource.class);

    private static final String ENTITY_NAME = "gearValueChainCategory";

    private final GearValueChainCategoryService gearValueChainCategoryService;

    public GearValueChainCategoryResource(GearValueChainCategoryService gearValueChainCategoryService) {
        this.gearValueChainCategoryService = gearValueChainCategoryService;
    }

    /**
     * POST  /gear-value-chain-categories : Create a new gearValueChainCategory.
     *
     * @param gearValueChainCategoryDTO the gearValueChainCategoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearValueChainCategoryDTO, or with status 400 (Bad Request) if the gearValueChainCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-value-chain-categories")
    @Timed
    public ResponseEntity<GearValueChainCategoryDTO> createGearValueChainCategory(@RequestBody GearValueChainCategoryDTO gearValueChainCategoryDTO) throws URISyntaxException {
        log.debug("REST request to save GearValueChainCategory : {}", gearValueChainCategoryDTO);
        if (gearValueChainCategoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearValueChainCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearValueChainCategoryDTO result = gearValueChainCategoryService.save(gearValueChainCategoryDTO);
        return ResponseEntity.created(new URI("/api/gear-value-chain-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-value-chain-categories : Updates an existing gearValueChainCategory.
     *
     * @param gearValueChainCategoryDTO the gearValueChainCategoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearValueChainCategoryDTO,
     * or with status 400 (Bad Request) if the gearValueChainCategoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearValueChainCategoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-value-chain-categories")
    @Timed
    public ResponseEntity<GearValueChainCategoryDTO> updateGearValueChainCategory(@RequestBody GearValueChainCategoryDTO gearValueChainCategoryDTO) throws URISyntaxException {
        log.debug("REST request to update GearValueChainCategory : {}", gearValueChainCategoryDTO);
        if (gearValueChainCategoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearValueChainCategoryDTO result = gearValueChainCategoryService.save(gearValueChainCategoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearValueChainCategoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-value-chain-categories : get all the gearValueChainCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearValueChainCategories in body
     */
    @GetMapping("/gear-value-chain-categories")
    @Timed
    public List<GearValueChainCategoryDTO> getAllGearValueChainCategories() {
        log.debug("REST request to get all GearValueChainCategories");
        return gearValueChainCategoryService.findAll();
    }

    /**
     * GET  /gear-value-chain-categories/:id : get the "id" gearValueChainCategory.
     *
     * @param id the id of the gearValueChainCategoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearValueChainCategoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-value-chain-categories/{id}")
    @Timed
    public ResponseEntity<GearValueChainCategoryDTO> getGearValueChainCategory(@PathVariable Long id) {
        log.debug("REST request to get GearValueChainCategory : {}", id);
        Optional<GearValueChainCategoryDTO> gearValueChainCategoryDTO = gearValueChainCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearValueChainCategoryDTO);
    }

    /**
     * DELETE  /gear-value-chain-categories/:id : delete the "id" gearValueChainCategory.
     *
     * @param id the id of the gearValueChainCategoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-value-chain-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearValueChainCategory(@PathVariable Long id) {
        log.debug("REST request to delete GearValueChainCategory : {}", id);
        gearValueChainCategoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/gear-value-chain-categories/{organizationalUnitId}/consult")
    @Timed
    public List<GearValueChainCategoryDTO> consultaCategoriaPorUnitId ( @PathVariable Long organizationalUnitId) {
        log.debug("Consultar CATEGORY  con todo : {}", organizationalUnitId);

        /** Consulta los Categoruias asociadas al id de Unidad Organizacional*/
        List<GearValueChainCategoryDTO> gearValueChainCategoryDTOS = this.gearValueChainCategoryService.consultaCategoriaPorUnitId(organizationalUnitId);
        log.debug("@@@@@@@@@$$$$$$$: {}", gearValueChainCategoryDTOS);

        return gearValueChainCategoryDTOS;

    }

}
