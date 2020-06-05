package co.fuziontek.repository;

import co.fuziontek.domain.AlfrescoSite;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AlfrescoSite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlfrescoSiteRepository extends JpaRepository<AlfrescoSite, Long> {

}
