package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearDocumentTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearDocumentType and its DTO GearDocumentTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {GearDomainMapper.class})
public interface GearDocumentTypeMapper extends EntityMapper<GearDocumentTypeDTO, GearDocumentType> {

    @Mapping(source = "geardomain.id", target = "geardomainId")
    @Mapping(source = "geardomain.name", target = "geardomainName")
    GearDocumentTypeDTO toDto(GearDocumentType gearDocumentType);

    @Mapping(target = "gearcustomfieldtemplates", ignore = true)
    @Mapping(source = "geardomainId", target = "geardomain")
    GearDocumentType toEntity(GearDocumentTypeDTO gearDocumentTypeDTO);

    default GearDocumentType fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearDocumentType gearDocumentType = new GearDocumentType();
        gearDocumentType.setId(id);
        return gearDocumentType;
    }
}
