package co.fuziontek.service.mapper;

import co.fuziontek.domain.*;
import co.fuziontek.service.dto.AlfrescoNodePropertiesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AlfrescoNodeProperties and its DTO AlfrescoNodePropertiesDTO.
 */
@Mapper(componentModel = "spring", uses = {AfrescoNodeMapper.class})
public interface AlfrescoNodePropertiesMapper extends EntityMapper<AlfrescoNodePropertiesDTO, AlfrescoNodeProperties> {

    @Mapping(source = "alfrescoNode.id", target = "alfrescoNodeId")
    AlfrescoNodePropertiesDTO toDto(AlfrescoNodeProperties alfrescoNodeProperties);

    @Mapping(source = "alfrescoNodeId", target = "alfrescoNode")
    AlfrescoNodeProperties toEntity(AlfrescoNodePropertiesDTO alfrescoNodePropertiesDTO);

    default AlfrescoNodeProperties fromId(Long id) {
        if (id == null) {
            return null;
        }
        AlfrescoNodeProperties alfrescoNodeProperties = new AlfrescoNodeProperties();
        alfrescoNodeProperties.setId(id);
        return alfrescoNodeProperties;
    }
}
