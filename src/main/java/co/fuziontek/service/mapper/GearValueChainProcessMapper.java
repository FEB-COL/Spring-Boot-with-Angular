package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearValueChainProcessDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearValueChainProcess and its DTO GearValueChainProcessDTO.
 */
@Mapper(componentModel = "spring", uses = {GearValueChainMacroprocessMapper.class})
public interface GearValueChainProcessMapper extends EntityMapper<GearValueChainProcessDTO, GearValueChainProcess> {

    @Mapping(source = "gearvaluechainmacroprocess.id", target = "gearvaluechainmacroprocessId")
    @Mapping(source = "gearvaluechainmacroprocess.name", target = "gearvaluechainmacroprocessName") //nuevo metodo de nombre para relacionar macro y proceso

    GearValueChainProcessDTO toDto(GearValueChainProcess gearValueChainProcess);

    @Mapping(target = "gearprocessinfosystems", ignore = true)
    @Mapping(source = "gearvaluechainmacroprocessId", target = "gearvaluechainmacroprocess")
    GearValueChainProcess toEntity(GearValueChainProcessDTO gearValueChainProcessDTO);

    default GearValueChainProcess fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearValueChainProcess gearValueChainProcess = new GearValueChainProcess();
        gearValueChainProcess.setId(id);
        return gearValueChainProcess;
    }
}
