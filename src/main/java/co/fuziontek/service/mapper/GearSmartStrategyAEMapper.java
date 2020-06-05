package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearSmartStrategyAEDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearSmartStrategyAE and its DTO GearSmartStrategyAEDTO.
 */
@Mapper(componentModel = "spring", uses = {GearGoalsStrategyAEMapper.class})
public interface GearSmartStrategyAEMapper extends EntityMapper<GearSmartStrategyAEDTO, GearSmartStrategyAE> {

    @Mapping(source = "geargoalsstrategyae.id", target = "geargoalsstrategyaeId")
    @Mapping(source = "geargoalsstrategyae.name", target = "geargoalsstrategyaeName") //relacion por nombre con Goals
    GearSmartStrategyAEDTO toDto(GearSmartStrategyAE gearSmartStrategyAE);

    @Mapping(source = "geargoalsstrategyaeId", target = "geargoalsstrategyae")
    GearSmartStrategyAE toEntity(GearSmartStrategyAEDTO gearSmartStrategyAEDTO);

    default GearSmartStrategyAE fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearSmartStrategyAE gearSmartStrategyAE = new GearSmartStrategyAE();
        gearSmartStrategyAE.setId(id);
        return gearSmartStrategyAE;
    }
}
