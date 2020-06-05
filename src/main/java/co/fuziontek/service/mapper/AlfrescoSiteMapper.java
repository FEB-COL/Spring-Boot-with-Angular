package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.AlfrescoSiteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AlfrescoSite and its DTO AlfrescoSiteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AlfrescoSiteMapper extends EntityMapper<AlfrescoSiteDTO, AlfrescoSite> {


    @Mapping(target = "alfrescoNodes", ignore = true)
    AlfrescoSite toEntity(AlfrescoSiteDTO alfrescoSiteDTO);

    default AlfrescoSite fromId(Long id) {
        if (id == null) {
            return null;
        }
        AlfrescoSite alfrescoSite = new AlfrescoSite();
        alfrescoSite.setId(id);
        return alfrescoSite;
    }
}
