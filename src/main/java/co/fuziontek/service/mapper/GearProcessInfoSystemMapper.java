package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearProcessInfoSystemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearProcessInfoSystem and its DTO GearProcessInfoSystemDTO.
 */
@Mapper(componentModel = "spring", uses = {GearInformationSystemsMapper.class, GearValueChainProcessMapper.class})
public interface GearProcessInfoSystemMapper extends EntityMapper<GearProcessInfoSystemDTO, GearProcessInfoSystem> {

    @Mapping(source = "gearinformationsystems.id", target = "gearinformationsystemsId")
    @Mapping(source = "gearvaluechainprocess.id", target = "gearvaluechainprocessId")
    GearProcessInfoSystemDTO toDto(GearProcessInfoSystem gearProcessInfoSystem);

    @Mapping(source = "gearinformationsystemsId", target = "gearinformationsystems")
    @Mapping(source = "gearvaluechainprocessId", target = "gearvaluechainprocess")
    GearProcessInfoSystem toEntity(GearProcessInfoSystemDTO gearProcessInfoSystemDTO);

    default GearProcessInfoSystem fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearProcessInfoSystem gearProcessInfoSystem = new GearProcessInfoSystem();
        gearProcessInfoSystem.setId(id);
        return gearProcessInfoSystem;
    }
}
