package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.ParLicenceTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ParLicenceType and its DTO ParLicenceTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ParLicenceTypeMapper extends EntityMapper<ParLicenceTypeDTO, ParLicenceType> {



    default ParLicenceType fromId(Long id) {
        if (id == null) {
            return null;
        }
        ParLicenceType parLicenceType = new ParLicenceType();
        parLicenceType.setId(id);
        return parLicenceType;
    }
}
