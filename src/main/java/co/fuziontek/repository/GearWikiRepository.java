package co.fuziontek.repository;

import co.fuziontek.domain.GearWiki;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearWiki entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearWikiRepository extends JpaRepository<GearWiki, Long> {

}
