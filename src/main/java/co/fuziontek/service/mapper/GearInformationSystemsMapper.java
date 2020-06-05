package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearInformationSystemsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearInformationSystems and its DTO GearInformationSystemsDTO.
 */
@Mapper(componentModel = "spring", uses = {GearOrganizationalUnitMapper.class, ParCoinTypeMapper.class})
public interface GearInformationSystemsMapper extends EntityMapper<GearInformationSystemsDTO, GearInformationSystems> {

    @Mapping(source = "gearOrganizationalUnit.id", target = "gearOrganizationalUnitId")
    @Mapping(source = "gearOrganizationalUnit.name", target = "gearOrganizationalUnitName")
    @Mapping(source = "parCoinType.id", target = "parCoinTypeId")
    @Mapping(source = "parCoinType.name", target = "parCoinTypeName")
    GearInformationSystemsDTO toDto(GearInformationSystems gearInformationSystems);

    @Mapping(target = "gearsystemsfunctionalities", ignore = true)
    @Mapping(target = "gearprocessinfosystems", ignore = true)
    @Mapping(source = "gearOrganizationalUnitId", target = "gearOrganizationalUnit")
    @Mapping(source = "parCoinTypeId", target = "parCoinType")
    GearInformationSystems toEntity(GearInformationSystemsDTO gearInformationSystemsDTO);

    default GearInformationSystems fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearInformationSystems gearInformationSystems = new GearInformationSystems();
        gearInformationSystems.setId(id);
        return gearInformationSystems;
    }
}
