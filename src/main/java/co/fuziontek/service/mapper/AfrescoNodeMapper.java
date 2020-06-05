package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.AfrescoNodeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AfrescoNode and its DTO AfrescoNodeDTO.
 */
@Mapper(componentModel = "spring", uses = {AlfrescoSiteMapper.class})
public interface AfrescoNodeMapper extends EntityMapper<AfrescoNodeDTO, AfrescoNode> {

    @Mapping(source = "alfrescoSite.id", target = "alfrescoSiteId")
    AfrescoNodeDTO toDto(AfrescoNode afrescoNode);

    @Mapping(target = "alfrescoProperties", ignore = true)
    @Mapping(source = "alfrescoSiteId", target = "alfrescoSite")
    AfrescoNode toEntity(AfrescoNodeDTO afrescoNodeDTO);

    default AfrescoNode fromId(Long id) {
        if (id == null) {
            return null;
        }
        AfrescoNode afrescoNode = new AfrescoNode();
        afrescoNode.setId(id);
        return afrescoNode;
    }
}
