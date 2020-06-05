package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearSurveySolveDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearSurveySolve and its DTO GearSurveySolveDTO.
 */
@Mapper(componentModel = "spring", uses = {GearSurveyMapper.class, GearSurveyQuestionMapper.class, GearSurveyAnswerMapper.class, GearUserMapper.class})
public interface GearSurveySolveMapper extends EntityMapper<GearSurveySolveDTO, GearSurveySolve> {

    @Mapping(source = "gearsurvey.id", target = "gearsurveyId")
    @Mapping(source = "gearsurvey.name", target = "gearsurveyName")
    @Mapping(source = "gearsurveyquestion.id", target = "gearsurveyquestionId")
    @Mapping(source = "gearsurveyquestion.text", target = "gearsurveyquestionName")
    @Mapping(source = "gearsurveyanswer.id", target = "gearsurveyanswerId")
    @Mapping(source = "gearsurveyanswer.text", target = "gearsurveyanswerName")
    @Mapping(source = "gearUser.id", target = "gearUserId")
    @Mapping(source = "gearUser.name", target = "gearUserName")
    GearSurveySolveDTO toDto(GearSurveySolve gearSurveySolve);

    @Mapping(source = "gearsurveyId", target = "gearsurvey")
    @Mapping(source = "gearsurveyquestionId", target = "gearsurveyquestion")
    @Mapping(source = "gearsurveyanswerId", target = "gearsurveyanswer")
    @Mapping(source = "gearUserId", target = "gearUser")
    GearSurveySolve toEntity(GearSurveySolveDTO gearSurveySolveDTO);

    default GearSurveySolve fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearSurveySolve gearSurveySolve = new GearSurveySolve();
        gearSurveySolve.setId(id);
        return gearSurveySolve;
    }
}
