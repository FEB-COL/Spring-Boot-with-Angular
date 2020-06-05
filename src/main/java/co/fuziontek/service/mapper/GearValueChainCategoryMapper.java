package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearValueChainCategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearValueChainCategory and its DTO GearValueChainCategoryDTO.
 */
@Mapper(componentModel = "spring", uses = {GearOrganizationalUnitMapper.class})
public interface GearValueChainCategoryMapper extends EntityMapper<GearValueChainCategoryDTO, GearValueChainCategory> {

    @Mapping(source = "gearOrganizationalUnit.id", target = "gearOrganizationalUnitId")
    @Mapping(source = "gearOrganizationalUnit.name", target = "gearOrganizationalUnitName")
    GearValueChainCategoryDTO toDto(GearValueChainCategory gearValueChainCategory);

    @Mapping(target = "gearvaluechainmacroprocesses", ignore = true)
    @Mapping(source = "gearOrganizationalUnitId", target = "gearOrganizationalUnit")
    GearValueChainCategory toEntity(GearValueChainCategoryDTO gearValueChainCategoryDTO);

    default GearValueChainCategory fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearValueChainCategory gearValueChainCategory = new GearValueChainCategory();
        gearValueChainCategory.setId(id);
        return gearValueChainCategory;
    }
}
