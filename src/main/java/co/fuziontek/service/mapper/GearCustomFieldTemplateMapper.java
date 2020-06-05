package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearCustomFieldTemplateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearCustomFieldTemplate and its DTO GearCustomFieldTemplateDTO.
 */
@Mapper(componentModel = "spring", uses = {GearDocumentTypeMapper.class})
public interface GearCustomFieldTemplateMapper extends EntityMapper<GearCustomFieldTemplateDTO, GearCustomFieldTemplate> {

    @Mapping(source = "gearDdocumenttype.id", target = "gearDdocumenttypeId")
    @Mapping(source = "gearDdocumenttype.name", target = "gearDdocumenttypeName")
    GearCustomFieldTemplateDTO toDto(GearCustomFieldTemplate gearCustomFieldTemplate);

    @Mapping(source = "gearDdocumenttypeId", target = "gearDdocumenttype")
    GearCustomFieldTemplate toEntity(GearCustomFieldTemplateDTO gearCustomFieldTemplateDTO);

    default GearCustomFieldTemplate fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearCustomFieldTemplate gearCustomFieldTemplate = new GearCustomFieldTemplate();
        gearCustomFieldTemplate.setId(id);
        return gearCustomFieldTemplate;
    }
}
