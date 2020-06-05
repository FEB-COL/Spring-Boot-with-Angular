package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearDiagAnswerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearDiagAnswer and its DTO GearDiagAnswerDTO.
 */
@Mapper(componentModel = "spring", uses = {GearDiagQuestionMapper.class})
public interface GearDiagAnswerMapper extends EntityMapper<GearDiagAnswerDTO, GearDiagAnswer> {

    @Mapping(source = "gearDiagquestion.id", target = "gearDiagquestionId")
    GearDiagAnswerDTO toDto(GearDiagAnswer gearDiagAnswer);

    @Mapping(source = "gearDiagquestionId", target = "gearDiagquestion")
    GearDiagAnswer toEntity(GearDiagAnswerDTO gearDiagAnswerDTO);

    default GearDiagAnswer fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearDiagAnswer gearDiagAnswer = new GearDiagAnswer();
        gearDiagAnswer.setId(id);
        return gearDiagAnswer;
    }
}
