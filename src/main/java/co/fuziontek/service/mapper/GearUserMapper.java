package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearUser and its DTO GearUserDTO.
 */
@Mapper(componentModel = "spring", uses = {GearOrganizationalUnitMapper.class})
public interface GearUserMapper extends EntityMapper<GearUserDTO, GearUser> {

    @Mapping(source = "gearOrganizationalUnit.id", target = "gearOrganizationalUnitId")
    @Mapping(source = "gearOrganizationalUnit.name", target = "gearOrganizationalUnitName")
    GearUserDTO toDto(GearUser gearUser);

    @Mapping(source = "gearOrganizationalUnitId", target = "gearOrganizationalUnit")
//    @Mapping(target = "gearSurveySolves", ignore = true)
    GearUser toEntity(GearUserDTO gearUserDTO);

    default GearUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearUser gearUser = new GearUser();
        gearUser.setId(id);
        return gearUser;
    }
}
