package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearOptionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearOption and its DTO GearOptionDTO.
 */
@Mapper(componentModel = "spring", uses = {GearDecisionMapper.class})
public interface GearOptionMapper extends EntityMapper<GearOptionDTO, GearOption> {

    @Mapping(source = "geardecision.id", target = "geardecisionId")
    @Mapping(source = "geardecision.name", target = "geardecisionName")
    GearOptionDTO toDto(GearOption gearOption);

    @Mapping(source = "geardecisionId", target = "geardecision")
    GearOption toEntity(GearOptionDTO gearOptionDTO);

    default GearOption fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearOption gearOption = new GearOption();
        gearOption.setId(id);
        return gearOption;
    }
}
