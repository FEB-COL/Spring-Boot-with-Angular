package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearSystemsFunctionalityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearSystemsFunctionality and its DTO GearSystemsFunctionalityDTO.
 */
@Mapper(componentModel = "spring", uses = {GearInformationSystemsMapper.class})
public interface GearSystemsFunctionalityMapper extends EntityMapper<GearSystemsFunctionalityDTO, GearSystemsFunctionality> {

    @Mapping(source = "gearinformationsystems.id", target = "gearinformationsystemsId")
    @Mapping(source = "gearinformationsystems.name", target = "gearInformationSystemName")//relacion por nombre con System

    GearSystemsFunctionalityDTO toDto(GearSystemsFunctionality gearSystemsFunctionality);

    @Mapping(source = "gearinformationsystemsId", target = "gearinformationsystems")
    GearSystemsFunctionality toEntity(GearSystemsFunctionalityDTO gearSystemsFunctionalityDTO);

    default GearSystemsFunctionality fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearSystemsFunctionality gearSystemsFunctionality = new GearSystemsFunctionality();
        gearSystemsFunctionality.setId(id);
        return gearSystemsFunctionality;
    }
}
