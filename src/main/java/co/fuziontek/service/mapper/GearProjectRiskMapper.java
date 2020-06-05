package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearProjectRiskDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearProjectRisk and its DTO GearProjectRiskDTO.
 */
@Mapper(componentModel = "spring", uses = {GearProjectMapper.class})
public interface GearProjectRiskMapper extends EntityMapper<GearProjectRiskDTO, GearProjectRisk> {

    @Mapping(source = "gearProject.id", target = "gearProjectId")
    @Mapping(source = "gearProject.name", target = "gearProjectName")
    GearProjectRiskDTO toDto(GearProjectRisk gearProjectRisk);

    @Mapping(target = "gearRiskLogs", ignore = true)
    @Mapping(source = "gearProjectId", target = "gearProject")
    GearProjectRisk toEntity(GearProjectRiskDTO gearProjectRiskDTO);

    default GearProjectRisk fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearProjectRisk gearProjectRisk = new GearProjectRisk();
        gearProjectRisk.setId(id);
        return gearProjectRisk;
    }
}
