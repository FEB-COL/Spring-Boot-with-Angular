package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearDecisionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearDecision and its DTO GearDecisionDTO.
 */
@Mapper(componentModel = "spring", uses = {GearDomainMapper.class})
public interface GearDecisionMapper extends EntityMapper<GearDecisionDTO, GearDecision> {

    @Mapping(source = "geardomain.id", target = "geardomainId")
    @Mapping(source = "geardomain.name", target = "geardomainName")
    GearDecisionDTO toDto(GearDecision gearDecision);

    @Mapping(target = "gearoptions", ignore = true)
    @Mapping(target = "gearcriteria", ignore = true)
    @Mapping(source = "geardomainId", target = "geardomain")
    GearDecision toEntity(GearDecisionDTO gearDecisionDTO);

    default GearDecision fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearDecision gearDecision = new GearDecision();
        gearDecision.setId(id);
        return gearDecision;
    }
}
