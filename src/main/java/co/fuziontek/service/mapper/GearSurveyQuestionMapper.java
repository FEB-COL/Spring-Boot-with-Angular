package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearSurveyQuestionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearSurveyQuestion and its DTO GearSurveyQuestionDTO.
 */
@Mapper(componentModel = "spring", uses = {GearSurveyMapper.class, GearSurveyQuestionTypeMapper.class})
public interface GearSurveyQuestionMapper extends EntityMapper<GearSurveyQuestionDTO, GearSurveyQuestion> {

    @Mapping(source = "gearsurvey.id", target = "gearsurveyId")
    @Mapping(source = "gearsurveyquestiontype.id", target = "gearsurveyquestiontypeId")
    GearSurveyQuestionDTO toDto(GearSurveyQuestion gearSurveyQuestion);

    @Mapping(target = "gearsurveyanswers", ignore = true)
    @Mapping(source = "gearsurveyId", target = "gearsurvey")
    @Mapping(source = "gearsurveyquestiontypeId", target = "gearsurveyquestiontype")
    GearSurveyQuestion toEntity(GearSurveyQuestionDTO gearSurveyQuestionDTO);

    default GearSurveyQuestion fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearSurveyQuestion gearSurveyQuestion = new GearSurveyQuestion();
        gearSurveyQuestion.setId(id);
        return gearSurveyQuestion;
    }
}
