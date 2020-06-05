package co.fuziontek.service;

import co.fuziontek.service.dto.GearUserDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing GearUser.
 */
public interface GearUserService {

    /**
     * Save a gearUser.
     *
     * @param gearUserDTO the entity to save
     * @return the persisted entity
     */
    GearUserDTO save(GearUserDTO gearUserDTO);

    /**
     * Get all the gearUsers.
     *
     * @return the list of entities
     */
    List<GearUserDTO> findAll();


    /**
     * Get the "id" gearUser.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GearUserDTO> findOne(Long id);

    /**
     * Delete the "id" gearUser.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Filrado de Usuarios Por Unidad Organizacional
     * @param organizationalUnitId
     * @return
     */
    List<GearUserDTO> consultaUsuarioPorUnitId (Long organizationalUnitId);
}
