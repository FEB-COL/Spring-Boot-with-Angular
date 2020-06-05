package co.fuziontek.service.impl;

import co.fuziontek.domain.GearOrganizationalUnit;
import co.fuziontek.domain.User;
import co.fuziontek.service.GearUserService;
import co.fuziontek.domain.GearUser;
import co.fuziontek.repository.GearUserRepository;
import co.fuziontek.service.MailService;
import co.fuziontek.service.UserService;
import co.fuziontek.service.dto.GearUserDTO;
import co.fuziontek.service.dto.UserDTO;
import co.fuziontek.service.mapper.GearUserMapper;
import co.fuziontek.web.rest.errors.BadRequestAlertException;
import co.fuziontek.web.rest.errors.EmailAlreadyUsedException;
import co.fuziontek.web.rest.errors.LoginAlreadyUsedException;
import co.fuziontek.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing GearUser.
 */
@Service
@Transactional
public class GearUserServiceImpl implements GearUserService {

    private final Logger log = LoggerFactory.getLogger(GearUserServiceImpl.class);

    private final GearUserRepository gearUserRepository;

    // configuracion y relacion de user con gear-user
    private final GearUserMapper gearUserMapper;
    // elemento exencial para la creacion de usuario de jhipster
    private final MailService mailService;

    //servicio de user de Jhipster, que se va utilzar para el mapeo de estas dos entidades OJo con esto ver documentacion referenciada en los comentarios
    // de estas entidades, o si no en los comentarios en el codigo
    private final UserService userService;

    public GearUserServiceImpl(GearUserRepository gearUserRepository, GearUserMapper gearUserMapper, UserService userService, MailService mailService) {
        this.gearUserRepository = gearUserRepository;
        this.gearUserMapper = gearUserMapper;
        this.userService = userService;
        this.mailService = mailService;
    }

    /**
     * Save a gearUser.
     *
     * @param gearUserDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GearUserDTO save(GearUserDTO gearUserDTO) {
        log.debug("Request to save GearUser : {}", gearUserDTO);

        //esta parte realiza una consulta con el id que le estamos enviando si el id es nulo no devuelve nada pero si el id exite lo busca y devuelve el id
        GearUser gearUser = gearUserMapper.toEntity(gearUserDTO);
        //OJo con esta parte debemos tener el user por defecto de JHIpter
        //preparamos las variables de utilizacion de codigo ojo con esta parte
        //llamar la craecion de usuario de Jhipster
        //ojo el perfil es el campo mas importante
        //*****************************************//
        //*****************************************//
        //Armado de Authorities de User  string to Set<String>
        UserDTO userDTO = new UserDTO();
        userDTO.setLangKey("es");
        userDTO.setEmail(gearUser.getEmail());
        userDTO.setFirstName(gearUser.getName());
        userDTO.setLastName(gearUser.getName());
        userDTO.setLogin(gearUser.getAvatar()); // la entidad mira coomo campo obligatorio OJO
        userDTO.setImageUrl("");
        userDTO.setPassword(gearUser.getPassword());
        Set<String> aux = new HashSet<>(Arrays.asList("1", gearUserDTO.getProfile()));
        aux = new HashSet<>(Arrays.asList(gearUserDTO.getProfile()));
        userDTO.setAuthorities(aux);
        //*****************************************//
        //*****************************************//
        //seteamos el pass OJO con esto
        //paso 1 Miramos qel el objeto que esta enviendo tenga id
        //sino lo tiene esta para la creacion de de usuario para este caso tenemos que llamar primero creteUser de jhipster
        if ( gearUserDTO.getId() == null){
            //creamos el usuario OJO
            User user = userService.createUser(userDTO);
            //seteamos el id de user a gearuser OJO paso importante
            gearUser.setId(user.getId());
            gearUser.setPassword(user.getPassword());
        }
        else {
            //En esta parte seteamos el Id
            userDTO.setId(gearUser.getId());
           userService.updateUser(userDTO);
        }

        gearUser = gearUserRepository.save(gearUser);
        return gearUserMapper.toDto(gearUser);
    }

    /**
     * Get all the gearUsers.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GearUserDTO> findAll() {
        log.debug("Request to get all GearUsers");
        return gearUserRepository.findAll().stream()
            .map(gearUserMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gearUser by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GearUserDTO> findOne(Long id) {
        log.debug("Request to get GearUser : {}", id);
        return gearUserRepository.findById(id)
            .map(gearUserMapper::toDto);
    }

    /**
     * Delete the gearUser by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete GearUser : {}", id);
        gearUserRepository.deleteById(id);
    }

    /**
     * Cosnulta de Usuarios por unidad Organizacional
     * @param organizationalUnitId
     * @return
     */
    @Override
    @Transactional (readOnly = true)
    public List<GearUserDTO> consultaUsuarioPorUnitId (Long organizationalUnitId){
        log.debug("Mostrar Usuarios por id  Organizacional : {}", organizationalUnitId);

        GearOrganizationalUnit gearOrganizationalUnit = new GearOrganizationalUnit();
        gearOrganizationalUnit.setId(organizationalUnitId);


        return gearUserRepository.findByGearOrganizationalUnit_Id(organizationalUnitId).stream()
            .map(gearUserMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

}
