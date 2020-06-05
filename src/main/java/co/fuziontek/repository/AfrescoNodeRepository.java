package co.fuziontek.repository;

import co.fuziontek.domain.AfrescoNode;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AfrescoNode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AfrescoNodeRepository extends JpaRepository<AfrescoNode, Long> {

}
