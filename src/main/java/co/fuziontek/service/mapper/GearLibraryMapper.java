package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearLibraryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearLibrary and its DTO GearLibraryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GearLibraryMapper extends EntityMapper<GearLibraryDTO, GearLibrary> {



    default GearLibrary fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearLibrary gearLibrary = new GearLibrary();
        gearLibrary.setId(id);
        return gearLibrary;
    }
}
