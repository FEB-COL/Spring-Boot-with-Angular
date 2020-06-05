package co.fuziontek.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearPortfolioService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearPortfolioDTO;
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
 * REST controller for managing GearPortfolio.
 */
@RestController
@RequestMapping("/api")
public class GearPortfolioResource {

    private final Logger log = LoggerFactory.getLogger(GearPortfolioResource.class);

    private static final String ENTITY_NAME = "gearPortfolio";

    private final GearPortfolioService gearPortfolioService;

    public GearPortfolioResource(GearPortfolioService gearPortfolioService) {
        this.gearPortfolioService = gearPortfolioService;
    }

    /**
     * POST  /gear-portfolios : Create a new gearPortfolio.
     *
     * @param gearPortfolioDTO the gearPortfolioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearPortfolioDTO, or with status 400 (Bad Request) if the gearPortfolio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-portfolios")
    @Timed
    public ResponseEntity<GearPortfolioDTO> createGearPortfolio(@RequestBody GearPortfolioDTO gearPortfolioDTO) throws URISyntaxException {
        log.debug("REST request to save GearPortfolio : {}", gearPortfolioDTO);
        if (gearPortfolioDTO.getId() != null) {
            throw new BadRequestAlertException("A new gearPortfolio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GearPortfolioDTO result = gearPortfolioService.save(gearPortfolioDTO);
        return ResponseEntity.created(new URI("/api/gear-portfolios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-portfolios : Updates an existing gearPortfolio.
     *
     * @param gearPortfolioDTO the gearPortfolioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearPortfolioDTO,
     * or with status 400 (Bad Request) if the gearPortfolioDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearPortfolioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-portfolios")
    @Timed
    public ResponseEntity<GearPortfolioDTO> updateGearPortfolio(@RequestBody GearPortfolioDTO gearPortfolioDTO) throws URISyntaxException {
        log.debug("REST request to update GearPortfolio : {}", gearPortfolioDTO);
        if (gearPortfolioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearPortfolioDTO result = gearPortfolioService.save(gearPortfolioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearPortfolioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-portfolios : get all the gearPortfolios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearPortfolios in body
     */
    @GetMapping("/gear-portfolios")
    @Timed
    public List<GearPortfolioDTO> getAllGearPortfolios() {
        log.debug("REST request to get all GearPortfolios");
        return gearPortfolioService.findAll();
    }

    /**
     * GET  /gear-portfolios/:id : get the "id" gearPortfolio.
     *
     * @param id the id of the gearPortfolioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearPortfolioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-portfolios/{id}")
    @Timed
    public ResponseEntity<GearPortfolioDTO> getGearPortfolio(@PathVariable Long id) {
        log.debug("REST request to get GearPortfolio : {}", id);
        Optional<GearPortfolioDTO> gearPortfolioDTO = gearPortfolioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearPortfolioDTO);
    }

    /**
     * DELETE  /gear-portfolios/:id : delete the "id" gearPortfolio.
     *
     * @param id the id of the gearPortfolioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-portfolios/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearPortfolio(@PathVariable Long id) {
        log.debug("REST request to delete GearPortfolio : {}", id);
        gearPortfolioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


    /**
     *
     * @param organizationalUnitId
     * @return
     */
    @GetMapping("/gear-portfolios/{organizationalUnitId}/consult")
    @Timed
    public List<GearPortfolioDTO> consultaPortafolioPorUnitId ( @PathVariable Long organizationalUnitId) {
        log.debug("Consultar PORTFOLIO  con todo : {}", organizationalUnitId);

        /** Consulta los Portafolios asociadas al id de Unidad Organizacional*/
        List<GearPortfolioDTO> gearPortfolioDTOS = this.gearPortfolioService.consultaPortafolioPorUnitId(organizationalUnitId);
        log.debug("@@@@@@@@@$$$$$$$: {}", gearPortfolioDTOS);

        return gearPortfolioDTOS;

    }
}
