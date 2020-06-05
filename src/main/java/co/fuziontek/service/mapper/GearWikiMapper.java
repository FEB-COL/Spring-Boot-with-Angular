package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.GearWikiDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity GearWiki and its DTO GearWikiDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GearWikiMapper extends EntityMapper<GearWikiDTO, GearWiki> {



    default GearWiki fromId(Long id) {
        if (id == null) {
            return null;
        }
        GearWiki gearWiki = new GearWiki();
        gearWiki.setId(id);
        return gearWiki;
    }
}
