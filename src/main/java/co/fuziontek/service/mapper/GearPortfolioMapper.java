package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearPortfolioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearPortfolio and its DTO GearPortfolioDTO.
 */
@Mapper(componentModel = "spring", uses = {GearOrganizationalUnitMapper.class})
public interface GearPortfolioMapper extends EntityMapper<GearPortfolioDTO, GearPortfolio> {

    @Mapping(source = "gearOrganizationalUnit.id", target = "gearOrganizationalUnitId")
    @Mapping(source = "gearOrganizationalUnit.name", target = "gearOrganizationalUnitName")
    GearPortfolioDTO toDto(GearPortfolio gearPortfolio);

    @Mapping(target = "gearProjects", ignore = true)
    @Mapping(source = "gearOrganizationalUnitId", target = "gearOrganizationalUnit")
    GearPortfolio toEntity(GearPortfolioDTO gearPortfolioDTO);

    default GearPortfolio fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearPortfolio gearPortfolio = new GearPortfolio();
        gearPortfolio.setId(id);
        return gearPortfolio;
    }
}
