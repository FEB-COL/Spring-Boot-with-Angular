package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearRiskLogDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearRiskLog and its DTO GearRiskLogDTO.
 */
@Mapper(componentModel = "spring", uses = {GearProjectRiskMapper.class})
public interface GearRiskLogMapper extends EntityMapper<GearRiskLogDTO, GearRiskLog> {

    @Mapping(source = "gearProjectRisk.id", target = "gearProjectRiskId")
    @Mapping(source = "gearProjectRisk.status", target = "gearProjectRiskStatus")
    GearRiskLogDTO toDto(GearRiskLog gearRiskLog);

    @Mapping(source = "gearProjectRiskId", target = "gearProjectRisk")
    GearRiskLog toEntity(GearRiskLogDTO gearRiskLogDTO);

    default GearRiskLog fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearRiskLog gearRiskLog = new GearRiskLog();
        gearRiskLog.setId(id);
        return gearRiskLog;
    }
}
