package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearValueChainMacroprocessDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearValueChainMacroprocess and its DTO GearValueChainMacroprocessDTO.
 */
@Mapper(componentModel = "spring", uses = {GearValueChainCategoryMapper.class})
public interface GearValueChainMacroprocessMapper extends EntityMapper<GearValueChainMacroprocessDTO, GearValueChainMacroprocess> {

    @Mapping(source = "gearvaluechaincategory.id", target = "gearvaluechaincategoryId")
    @Mapping(source = "gearvaluechaincategory.name", target = "gearvaluechaincategoryName")

    GearValueChainMacroprocessDTO toDto(GearValueChainMacroprocess gearValueChainMacroprocess);

    @Mapping(target = "gearvaluechainprocesses", ignore = true)
    @Mapping(source = "gearvaluechaincategoryId", target = "gearvaluechaincategory")
    GearValueChainMacroprocess toEntity(GearValueChainMacroprocessDTO gearValueChainMacroprocessDTO);

    default GearValueChainMacroprocess fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearValueChainMacroprocess gearValueChainMacroprocess = new GearValueChainMacroprocess();
        gearValueChainMacroprocess.setId(id);
        return gearValueChainMacroprocess;
    }
}
