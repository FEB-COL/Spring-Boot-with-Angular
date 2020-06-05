package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearDiagnosisDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearDiagnosis and its DTO GearDiagnosisDTO.
 */
@Mapper(componentModel = "spring", uses = {GearDiagnosisTypeMapper.class, GearDomainMapper.class})
public interface GearDiagnosisMapper extends EntityMapper<GearDiagnosisDTO, GearDiagnosis> {

    @Mapping(source = "gearDiagnosisType.id", target = "gearDiagnosisTypeId")
    @Mapping(source = "gearDomain.id", target = "gearDomainId")
    @Mapping(source = "gearDomain.name", target = "gearDomainName")
    GearDiagnosisDTO toDto(GearDiagnosis gearDiagnosis);

    @Mapping(target = "gearDiagQuestions", ignore = true)
    @Mapping(source = "gearDiagnosisTypeId", target = "gearDiagnosisType")
    @Mapping(source = "gearDomainId", target = "gearDomain")
    GearDiagnosis toEntity(GearDiagnosisDTO gearDiagnosisDTO);

    default GearDiagnosis fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearDiagnosis gearDiagnosis = new GearDiagnosis();
        gearDiagnosis.setId(id);
        return gearDiagnosis;
    }
}
