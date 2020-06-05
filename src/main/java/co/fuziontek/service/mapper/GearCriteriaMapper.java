package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearCriteriaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearCriteria and its DTO GearCriteriaDTO.
 */
@Mapper(componentModel = "spring", uses = {GearDecisionMapper.class})
public interface GearCriteriaMapper extends EntityMapper<GearCriteriaDTO, GearCriteria> {

    @Mapping(source = "geardecision.id", target = "geardecisionId")
    @Mapping(source = "geardecision.name", target = "geardecisionName")
    GearCriteriaDTO toDto(GearCriteria gearCriteria);

    @Mapping(source = "geardecisionId", target = "geardecision")
    GearCriteria toEntity(GearCriteriaDTO gearCriteriaDTO);

    default GearCriteria fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearCriteria gearCriteria = new GearCriteria();
        gearCriteria.setId(id);
        return gearCriteria;
    }
}
