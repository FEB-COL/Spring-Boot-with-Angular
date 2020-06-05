package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearDiagQuestionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearDiagQuestion and its DTO GearDiagQuestionDTO.
 */
@Mapper(componentModel = "spring", uses = {GearDiagnosisMapper.class, GearAmbitMapper.class})
public interface GearDiagQuestionMapper extends EntityMapper<GearDiagQuestionDTO, GearDiagQuestion> {

    @Mapping(source = "gearDiagnosis.id", target = "gearDiagnosisId")
    @Mapping(source = "gearDiagnosis.name", target = "gearDiagnosisName")
    @Mapping(source = "gearAmbit.id", target = "gearAmbitId")
    @Mapping(source = "gearAmbit.name", target = "gearAmbitName")
    GearDiagQuestionDTO toDto(GearDiagQuestion gearDiagQuestion);

    @Mapping(target = "gearDiagAnswers", ignore = true)
    @Mapping(source = "gearDiagnosisId", target = "gearDiagnosis")
    @Mapping(source = "gearAmbitId", target = "gearAmbit")
    GearDiagQuestion toEntity(GearDiagQuestionDTO gearDiagQuestionDTO);

    default GearDiagQuestion fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearDiagQuestion gearDiagQuestion = new GearDiagQuestion();
        gearDiagQuestion.setId(id);
        return gearDiagQuestion;
    }
}
