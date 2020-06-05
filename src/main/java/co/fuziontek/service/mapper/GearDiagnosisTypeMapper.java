package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearDiagnosisTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearDiagnosisType and its DTO GearDiagnosisTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GearDiagnosisTypeMapper extends EntityMapper<GearDiagnosisTypeDTO, GearDiagnosisType> {


    @Mapping(target = "gearDiagnoses", ignore = true)
    GearDiagnosisType toEntity(GearDiagnosisTypeDTO gearDiagnosisTypeDTO);

    default GearDiagnosisType fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearDiagnosisType gearDiagnosisType = new GearDiagnosisType();
        gearDiagnosisType.setId(id);
        return gearDiagnosisType;
    }
}
