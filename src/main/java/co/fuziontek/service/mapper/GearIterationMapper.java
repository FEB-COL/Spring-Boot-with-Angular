package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearIterationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearIteration and its DTO GearIterationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GearIterationMapper extends EntityMapper<GearIterationDTO, GearIteration> {


    @Mapping(target = "gearProjects", ignore = true)
    GearIteration toEntity(GearIterationDTO gearIterationDTO);

    default GearIteration fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearIteration gearIteration = new GearIteration();
        gearIteration.setId(id);
        return gearIteration;
    }
}
