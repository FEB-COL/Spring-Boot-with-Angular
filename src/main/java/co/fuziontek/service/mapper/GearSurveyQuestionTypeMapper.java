package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearSurveyQuestionTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearSurveyQuestionType and its DTO GearSurveyQuestionTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GearSurveyQuestionTypeMapper extends EntityMapper<GearSurveyQuestionTypeDTO, GearSurveyQuestionType> {


    @Mapping(target = "gearsurveyquestions", ignore = true)
    GearSurveyQuestionType toEntity(GearSurveyQuestionTypeDTO gearSurveyQuestionTypeDTO);

    default GearSurveyQuestionType fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearSurveyQuestionType gearSurveyQuestionType = new GearSurveyQuestionType();
        gearSurveyQuestionType.setId(id);
        return gearSurveyQuestionType;
    }
}
