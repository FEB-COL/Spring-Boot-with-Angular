package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearAmbitDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearAmbit and its DTO GearAmbitDTO.
 */
@Mapper(componentModel = "spring", uses = {GearDomainMapper.class})
public interface GearAmbitMapper extends EntityMapper<GearAmbitDTO, GearAmbit> {

    @Mapping(source = "gearDomain.id", target = "gearDomainId")
    @Mapping(source = "gearDomain.name", target = "gearDomainName")
    GearAmbitDTO toDto(GearAmbit gearAmbit);

    @Mapping(target = "gearDiagQuestions", ignore = true)
    @Mapping(source = "gearDomainId", target = "gearDomain")
    GearAmbit toEntity(GearAmbitDTO gearAmbitDTO);

    default GearAmbit fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearAmbit gearAmbit = new GearAmbit();
        gearAmbit.setId(id);
        return gearAmbit;
    }
}
