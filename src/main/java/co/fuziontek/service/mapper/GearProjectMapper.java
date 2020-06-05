package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearProjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearProject and its DTO GearProjectDTO.
 */
@Mapper(componentModel = "spring", uses = {GearIterationMapper.class, GearPortfolioMapper.class})
public interface GearProjectMapper extends EntityMapper<GearProjectDTO, GearProject> {

    @Mapping(source = "gearPortfolio.id", target = "gearPortfolioId")
    @Mapping(source = "gearPortfolio.name", target = "gearPortfolioName")
    GearProjectDTO toDto(GearProject gearProject);

    @Mapping(target = "gearProjectRisks", ignore = true)
    @Mapping(source = "gearPortfolioId", target = "gearPortfolio")
    GearProject toEntity(GearProjectDTO gearProjectDTO);

    default GearProject fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearProject gearProject = new GearProject();
        gearProject.setId(id);
        return gearProject;
    }
}
