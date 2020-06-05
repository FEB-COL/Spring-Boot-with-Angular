package co.fuziontek.web.rest;

import co.fuziontek.service.UserService;
import com.codahale.metrics.annotation.Timed;
import co.fuziontek.service.GearUserService;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.util.HeaderUtil;
import co.fuziontek.service.dto.GearUserDTO;
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
 * REST controller for managing GearUser.
 */
@RestController
@RequestMapping("/api")
public class GearUserResource {

    private final Logger log = LoggerFactory.getLogger(GearUserResource.class);

    private static final String ENTITY_NAME = "gearUser";

    private final GearUserService gearUserService;

    //Implemetacion de userService para la eliminacion OJO
    private final UserService userService;

    public GearUserResource(GearUserService gearUserService, UserService userService) {
        this.gearUserService = gearUserService;
        this.userService = userService;
    }

    /**
     * POST  /gear-users : Create a new gearUser.
     *
     * @param gearUserDTO the gearUserDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new gearUserDTO, or with status 400 (Bad Request) if the gearUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/gear-users")
    @Timed
    public ResponseEntity<GearUserDTO> createGearUser(@RequestBody GearUserDTO gearUserDTO) throws URISyntaxException {
        log.debug("REST request to save GearUser : {}", gearUserDTO);
        //esta parte se debe quitar por el id lo tomamos de User de jhipster no gearUser OJO mirar documentacion
//        if (gearUserDTO.getId() != null) {
//            throw new BadRequestAlertException("A new gearUser cannot already have an ID", ENTITY_NAME, "idexists");
//        }
        GearUserDTO result = gearUserService.save(gearUserDTO);
        return ResponseEntity.created(new URI("/api/gear-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /gear-users : Updates an existing gearUser.
     *
     * @param gearUserDTO the gearUserDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated gearUserDTO,
     * or with status 400 (Bad Request) if the gearUserDTO is not valid,
     * or with status 500 (Internal Server Error) if the gearUserDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/gear-users")
    @Timed
    public ResponseEntity<GearUserDTO> updateGearUser(@RequestBody GearUserDTO gearUserDTO) throws URISyntaxException {
        log.debug("REST request to update GearUser : {}", gearUserDTO);
        if (gearUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GearUserDTO result = gearUserService.save(gearUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, gearUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /gear-users : get all the gearUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of gearUsers in body
     */
    @GetMapping("/gear-users")
    @Timed
    public List<GearUserDTO> getAllGearUsers() {
        log.debug("REST request to get all GearUsers");
        return gearUserService.findAll();
    }

    /**
     * GET  /gear-users/:id : get the "id" gearUser.
     *
     * @param id the id of the gearUserDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the gearUserDTO, or with status 404 (Not Found)
     */
    @GetMapping("/gear-users/{id}")
    @Timed
    public ResponseEntity<GearUserDTO> getGearUser(@PathVariable Long id) {
        log.debug("REST request to get GearUser : {}", id);
        Optional<GearUserDTO> gearUserDTO = gearUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(gearUserDTO);
    }

    /**
     * DELETE  /gear-users/:id : delete the "id" gearUser.
     *
     * @param id the id of the gearUserDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/gear-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteGearUser(@PathVariable Long id) {
        //debemos elimnar el usuario primero para que no ocurra un error ojo con esta parte
        //para este caso como debemos elimnar primero el user de jhipster este se realiza buscando el campo Login
        //para este caso obtenemos el login y lo seteamos en la una variable de user para que lo elimine y posteriormente
        // lo eliminamos en user-gear y esto es todo
        log.debug("REST request to delete GearUser : {}", id);
        ResponseEntity<Void> result;
        //Buscamos el user-gear para el campo que necesitamos OJO con esta campo debe ser Unico
        Optional<GearUserDTO> gearUserDTO = gearUserService.findOne(id);
        if (gearUserDTO.isPresent()) {
            //Eliminacion de user de Jhipster oJO
            userService.deleteUser(gearUserDTO.map(GearUserDTO::getAvatar).get());
            // Falta verificacion del lado de user para la eliminacion del usuario
            //mejoras futuras ISSUE ---> TODO
            //Elimino el usuario de Gear-User
            gearUserService.delete(id);
            result = ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
        }
        else {
            result = ResponseEntity.notFound().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
        }
        return result;
    }


    /**
     *  Filtrado por Unidad Organizacional
     * @param organizationalUnitId
     * @return
     */
    @GetMapping("/gear-users/{organizationalUnitId}/consult")
    @Timed
    public List<GearUserDTO> consultaUsuarioPorUnitId ( @PathVariable Long organizationalUnitId) {
        log.debug("Consultar USERS  con todo : {}", organizationalUnitId);

        /** Consulta los Usuarios asociadas al id de Unidad Organizacional*/
        List<GearUserDTO> gearUserDTOS = this.gearUserService.consultaUsuarioPorUnitId(organizationalUnitId);
        log.debug("@@@@@@@@@$$$$$$$: {}", gearUserDTOS);

        return gearUserDTOS;

    }




}
