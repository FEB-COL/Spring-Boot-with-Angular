package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearGoalsStrategyAEDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearGoalsStrategyAE and its DTO GearGoalsStrategyAEDTO.
 */
@Mapper(componentModel = "spring", uses = {GearOrganizationalUnitMapper.class})
public interface GearGoalsStrategyAEMapper extends EntityMapper<GearGoalsStrategyAEDTO, GearGoalsStrategyAE> {

    @Mapping(source = "gearOrganizationalUnit.id", target = "gearOrganizationalUnitId")
    @Mapping(source = "gearOrganizationalUnit.name", target = "gearOrganizationalUnitName")
    GearGoalsStrategyAEDTO toDto(GearGoalsStrategyAE gearGoalsStrategyAE);

    @Mapping(target = "gearsmartstrategyaes", ignore = true)
    @Mapping(source = "gearOrganizationalUnitId", target = "gearOrganizationalUnit")
    GearGoalsStrategyAE toEntity(GearGoalsStrategyAEDTO gearGoalsStrategyAEDTO);

    default GearGoalsStrategyAE fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearGoalsStrategyAE gearGoalsStrategyAE = new GearGoalsStrategyAE();
        gearGoalsStrategyAE.setId(id);
        return gearGoalsStrategyAE;
    }
}
