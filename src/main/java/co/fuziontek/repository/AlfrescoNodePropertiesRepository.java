package co.fuziontek.repository;

import co.fuziontek.domain.AlfrescoNodeProperties;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AlfrescoNodeProperties entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlfrescoNodePropertiesRepository extends JpaRepository<AlfrescoNodeProperties, Long> {

}
