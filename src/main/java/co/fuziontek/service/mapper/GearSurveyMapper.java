package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearSurveyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearSurvey and its DTO GearSurveyDTO.
 */
@Mapper(componentModel = "spring", uses = {GearOrganizationalUnitMapper.class})
public interface GearSurveyMapper extends EntityMapper<GearSurveyDTO, GearSurvey> {

    @Mapping(source = "gearOrganizationalUnit.id", target = "gearOrganizationalUnitId")
    @Mapping(source = "gearOrganizationalUnit.name", target = "gearOrganizationalUnitName")
    GearSurveyDTO toDto(GearSurvey gearSurvey);

    @Mapping(target = "gearsurveyquestions", ignore = true)
    @Mapping(target = "gearsurveysolves", ignore = true)
    @Mapping(source = "gearOrganizationalUnitId", target = "gearOrganizationalUnit")
    GearSurvey toEntity(GearSurveyDTO gearSurveyDTO);

    default GearSurvey fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearSurvey gearSurvey = new GearSurvey();
        gearSurvey.setId(id);
        return gearSurvey;
    }
}
