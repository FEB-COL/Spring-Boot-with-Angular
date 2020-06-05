package co.fuziontek.repository;

import co.fuziontek.domain.GearCustomFieldTemplate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearCustomFieldTemplate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearCustomFieldTemplateRepository extends JpaRepository<GearCustomFieldTemplate, Long> {

}
