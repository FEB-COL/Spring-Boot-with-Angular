package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.ParCoinTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ParCoinType and its DTO ParCoinTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ParCoinTypeMapper extends EntityMapper<ParCoinTypeDTO, ParCoinType> {


    @Mapping(target = "gearInformationSystems", ignore = true)
    ParCoinType toEntity(ParCoinTypeDTO parCoinTypeDTO);

    default ParCoinType fromId(Long id) {
        if (id == null) {
            return null;
        }
        ParCoinType parCoinType = new ParCoinType();
        parCoinType.setId(id);
        return parCoinType;
    }
}
