package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearOrganizationalUnitDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearOrganizationalUnit and its DTO GearOrganizationalUnitDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GearOrganizationalUnitMapper extends EntityMapper<GearOrganizationalUnitDTO, GearOrganizationalUnit> {


    @Mapping(target = "gearDomains", ignore = true)
    @Mapping(target = "gearUsers", ignore = true)
    @Mapping(target = "gearPortfolios", ignore = true)
    @Mapping(target = "gearGoalsStrategyAES", ignore = true)
    @Mapping(target = "gearValueChainCategories", ignore = true)
    @Mapping(target = "gearInformationSystems", ignore = true)
    @Mapping(target = "gearSurveys", ignore = true)
    GearOrganizationalUnit toEntity(GearOrganizationalUnitDTO gearOrganizationalUnitDTO);

    default GearOrganizationalUnit fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearOrganizationalUnit gearOrganizationalUnit = new GearOrganizationalUnit();
        gearOrganizationalUnit.setId(id);
        return gearOrganizationalUnit;
    }
}
