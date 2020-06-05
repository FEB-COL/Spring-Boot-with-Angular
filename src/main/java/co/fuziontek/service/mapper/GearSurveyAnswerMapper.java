package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearSurveyAnswerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearSurveyAnswer and its DTO GearSurveyAnswerDTO.
 */
@Mapper(componentModel = "spring", uses = {GearSurveyQuestionMapper.class})
public interface GearSurveyAnswerMapper extends EntityMapper<GearSurveyAnswerDTO, GearSurveyAnswer> {

    @Mapping(source = "gearsurveyquestion.id", target = "gearsurveyquestionId")
    GearSurveyAnswerDTO toDto(GearSurveyAnswer gearSurveyAnswer);

    @Mapping(source = "gearsurveyquestionId", target = "gearsurveyquestion")
    GearSurveyAnswer toEntity(GearSurveyAnswerDTO gearSurveyAnswerDTO);

    default GearSurveyAnswer fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearSurveyAnswer gearSurveyAnswer = new GearSurveyAnswer();
        gearSurveyAnswer.setId(id);
        return gearSurveyAnswer;
    }
}
