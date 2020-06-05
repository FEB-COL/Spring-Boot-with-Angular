package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.ParSystemTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ParSystemType and its DTO ParSystemTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ParSystemTypeMapper extends EntityMapper<ParSystemTypeDTO, ParSystemType> {



    default ParSystemType fromId(Long id) {
        if (id == null) {
            return null;
        }
        ParSystemType parSystemType = new ParSystemType();
        parSystemType.setId(id);
        return parSystemType;
    }
}
