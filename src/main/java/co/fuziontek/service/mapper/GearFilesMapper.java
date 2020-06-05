package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearFilesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearFiles and its DTO GearFilesDTO.
 */
@Mapper(componentModel = "spring", uses = {GearDomainMapper.class})
public interface GearFilesMapper extends EntityMapper<GearFilesDTO, GearFiles> {

    @Mapping(source = "gearDomain.id", target = "gearDomainId")
    @Mapping(source = "gearDomain.name", target = "gearDomainName")
    GearFilesDTO toDto(GearFiles gearFiles);

    @Mapping(source = "gearDomainId", target = "gearDomain")
    GearFiles toEntity(GearFilesDTO gearFilesDTO);

    default GearFiles fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearFiles gearFiles = new GearFiles();
        gearFiles.setId(id);
        return gearFiles;
    }
}
