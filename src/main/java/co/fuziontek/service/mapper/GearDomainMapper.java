package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearDomainDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearDomain and its DTO GearDomainDTO.
 */
@Mapper(componentModel = "spring", uses = {GearOrganizationalUnitMapper.class})
public interface GearDomainMapper extends EntityMapper<GearDomainDTO, GearDomain> {

    @Mapping(source = "gearOrganizationalUnit.id", target = "gearOrganizationalUnitId")
    @Mapping(source = "gearOrganizationalUnit.name", target = "gearOrganizationalUnitName")
    GearDomainDTO toDto(GearDomain gearDomain);

    @Mapping(target = "geardocumenttypes", ignore = true)
    @Mapping(target = "gearAmbits", ignore = true)
    @Mapping(target = "gearFiles", ignore = true)
    @Mapping(source = "gearOrganizationalUnitId", target = "gearOrganizationalUnit")
    @Mapping(target = "gearDiagnoses", ignore = true)
    GearDomain toEntity(GearDomainDTO gearDomainDTO);

    default GearDomain fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearDomain gearDomain = new GearDomain();
        gearDomain.setId(id);
        return gearDomain;
    }
}
