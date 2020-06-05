package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearOrganizationalUnit;
import co.fuziontek.repository.GearOrganizationalUnitRepository;
import co.fuziontek.service.GearOrganizationalUnitService;
import co.fuziontek.service.dto.GearOrganizationalUnitDTO;
import co.fuziontek.service.mapper.GearOrganizationalUnitMapper;
import co.fuziontek.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static co.fuziontek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GearOrganizationalUnitResource REST controller.
 *
 * @see GearOrganizationalUnitResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearOrganizationalUnitResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NODE_ID_ALFRESCO = "AAAAAAAAAA";
    private static final String UPDATED_NODE_ID_ALFRESCO = "BBBBBBBBBB";

    private static final String DEFAULT_SITE_ID = "AAAAAAAAAA";
    private static final String UPDATED_SITE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_SITE_GUID = "AAAAAAAAAA";
    private static final String UPDATED_SITE_GUID = "BBBBBBBBBB";

    private static final Integer DEFAULT_LOWERCASE_RESTRICTIONS = 1;
    private static final Integer UPDATED_LOWERCASE_RESTRICTIONS = 2;

    private static final Integer DEFAULT_UPPERCASE_RESTRICTIONS = 1;
    private static final Integer UPDATED_UPPERCASE_RESTRICTIONS = 2;

    private static final Integer DEFAULT_SPECIAL_CHARACTERS_RESTRICTIONS = 1;
    private static final Integer UPDATED_SPECIAL_CHARACTERS_RESTRICTIONS = 2;

    private static final Integer DEFAULT_DIGITS_RESTRICTIONS = 1;
    private static final Integer UPDATED_DIGITS_RESTRICTIONS = 2;

    private static final Integer DEFAULT_MINIMUM_LENGTH_RESTRICTIONS = 1;
    private static final Integer UPDATED_MINIMUM_LENGTH_RESTRICTIONS = 2;

    private static final Integer DEFAULT_MAXIMUM_LENGTH_RESTRICTION = 1;
    private static final Integer UPDATED_MAXIMUM_LENGTH_RESTRICTION = 2;

    private static final String DEFAULT_REGEX_CORREO_RESTRICTION = "AAAAAAAAAA";
    private static final String UPDATED_REGEX_CORREO_RESTRICTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_MAXIMUM_ATTEMPS_RESTRICTION = 1;
    private static final Integer UPDATED_MAXIMUM_ATTEMPS_RESTRICTION = 2;

    private static final String DEFAULT_AUTOMATIC_LOCK_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_AUTOMATIC_LOCK_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_MANUAL_LOCK_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_MANUAL_LOCK_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_RESET_PASSWORD_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_RESET_PASSWORD_EMAIL = "BBBBBBBBBB";

    private static final Integer DEFAULT_PASSWORD_EXPIRES_DAYS = 1;
    private static final Integer UPDATED_PASSWORD_EXPIRES_DAYS = 2;

    @Autowired
    private GearOrganizationalUnitRepository gearOrganizationalUnitRepository;

    @Autowired
    private GearOrganizationalUnitMapper gearOrganizationalUnitMapper;

    @Autowired
    private GearOrganizationalUnitService gearOrganizationalUnitService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearOrganizationalUnitMockMvc;

    private GearOrganizationalUnit gearOrganizationalUnit;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearOrganizationalUnitResource gearOrganizationalUnitResource = new GearOrganizationalUnitResource(gearOrganizationalUnitService);
        this.restGearOrganizationalUnitMockMvc = MockMvcBuilders.standaloneSetup(gearOrganizationalUnitResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GearOrganizationalUnit createEntity(EntityManager em) {
        GearOrganizationalUnit gearOrganizationalUnit = new GearOrganizationalUnit()
            .name(DEFAULT_NAME)
            .nodeIdAlfresco(DEFAULT_NODE_ID_ALFRESCO)
            .siteId(DEFAULT_SITE_ID)
            .siteGuid(DEFAULT_SITE_GUID)
            .lowercaseRestrictions(DEFAULT_LOWERCASE_RESTRICTIONS)
            .uppercaseRestrictions(DEFAULT_UPPERCASE_RESTRICTIONS)
            .specialCharactersRestrictions(DEFAULT_SPECIAL_CHARACTERS_RESTRICTIONS)
            .digitsRestrictions(DEFAULT_DIGITS_RESTRICTIONS)
            .minimumLengthRestrictions(DEFAULT_MINIMUM_LENGTH_RESTRICTIONS)
            .maximumLengthRestriction(DEFAULT_MAXIMUM_LENGTH_RESTRICTION)
            .regexCorreoRestriction(DEFAULT_REGEX_CORREO_RESTRICTION)
            .maximumAttempsRestriction(DEFAULT_MAXIMUM_ATTEMPS_RESTRICTION)
            .automaticLockEmail(DEFAULT_AUTOMATIC_LOCK_EMAIL)
            .manualLockEmail(DEFAULT_MANUAL_LOCK_EMAIL)
            .resetPasswordEmail(DEFAULT_RESET_PASSWORD_EMAIL)
            .passwordExpiresDays(DEFAULT_PASSWORD_EXPIRES_DAYS);
        return gearOrganizationalUnit;
    }

    @Before
    public void initTest() {
        gearOrganizationalUnit = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearOrganizationalUnit() throws Exception {
        int databaseSizeBeforeCreate = gearOrganizationalUnitRepository.findAll().size();

        // Create the GearOrganizationalUnit
        GearOrganizationalUnitDTO gearOrganizationalUnitDTO = gearOrganizationalUnitMapper.toDto(gearOrganizationalUnit);
        restGearOrganizationalUnitMockMvc.perform(post("/api/gear-organizational-units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearOrganizationalUnitDTO)))
            .andExpect(status().isCreated());

        // Validate the GearOrganizationalUnit in the database
        List<GearOrganizationalUnit> gearOrganizationalUnitList = gearOrganizationalUnitRepository.findAll();
        assertThat(gearOrganizationalUnitList).hasSize(databaseSizeBeforeCreate + 1);
        GearOrganizationalUnit testGearOrganizationalUnit = gearOrganizationalUnitList.get(gearOrganizationalUnitList.size() - 1);
        assertThat(testGearOrganizationalUnit.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearOrganizationalUnit.getNodeIdAlfresco()).isEqualTo(DEFAULT_NODE_ID_ALFRESCO);
        assertThat(testGearOrganizationalUnit.getSiteId()).isEqualTo(DEFAULT_SITE_ID);
        assertThat(testGearOrganizationalUnit.getSiteGuid()).isEqualTo(DEFAULT_SITE_GUID);
        assertThat(testGearOrganizationalUnit.getLowercaseRestrictions()).isEqualTo(DEFAULT_LOWERCASE_RESTRICTIONS);
        assertThat(testGearOrganizationalUnit.getUppercaseRestrictions()).isEqualTo(DEFAULT_UPPERCASE_RESTRICTIONS);
        assertThat(testGearOrganizationalUnit.getSpecialCharactersRestrictions()).isEqualTo(DEFAULT_SPECIAL_CHARACTERS_RESTRICTIONS);
        assertThat(testGearOrganizationalUnit.getDigitsRestrictions()).isEqualTo(DEFAULT_DIGITS_RESTRICTIONS);
        assertThat(testGearOrganizationalUnit.getMinimumLengthRestrictions()).isEqualTo(DEFAULT_MINIMUM_LENGTH_RESTRICTIONS);
        assertThat(testGearOrganizationalUnit.getMaximumLengthRestriction()).isEqualTo(DEFAULT_MAXIMUM_LENGTH_RESTRICTION);
        assertThat(testGearOrganizationalUnit.getRegexCorreoRestriction()).isEqualTo(DEFAULT_REGEX_CORREO_RESTRICTION);
        assertThat(testGearOrganizationalUnit.getMaximumAttempsRestriction()).isEqualTo(DEFAULT_MAXIMUM_ATTEMPS_RESTRICTION);
        assertThat(testGearOrganizationalUnit.getAutomaticLockEmail()).isEqualTo(DEFAULT_AUTOMATIC_LOCK_EMAIL);
        assertThat(testGearOrganizationalUnit.getManualLockEmail()).isEqualTo(DEFAULT_MANUAL_LOCK_EMAIL);
        assertThat(testGearOrganizationalUnit.getResetPasswordEmail()).isEqualTo(DEFAULT_RESET_PASSWORD_EMAIL);
        assertThat(testGearOrganizationalUnit.getPasswordExpiresDays()).isEqualTo(DEFAULT_PASSWORD_EXPIRES_DAYS);
    }

    @Test
    @Transactional
    public void createGearOrganizationalUnitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearOrganizationalUnitRepository.findAll().size();

        // Create the GearOrganizationalUnit with an existing ID
        gearOrganizationalUnit.setId(1L);
        GearOrganizationalUnitDTO gearOrganizationalUnitDTO = gearOrganizationalUnitMapper.toDto(gearOrganizationalUnit);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearOrganizationalUnitMockMvc.perform(post("/api/gear-organizational-units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearOrganizationalUnitDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearOrganizationalUnit in the database
        List<GearOrganizationalUnit> gearOrganizationalUnitList = gearOrganizationalUnitRepository.findAll();
        assertThat(gearOrganizationalUnitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearOrganizationalUnits() throws Exception {
        // Initialize the database
        gearOrganizationalUnitRepository.saveAndFlush(gearOrganizationalUnit);

        // Get all the gearOrganizationalUnitList
        restGearOrganizationalUnitMockMvc.perform(get("/api/gear-organizational-units?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearOrganizationalUnit.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].nodeIdAlfresco").value(hasItem(DEFAULT_NODE_ID_ALFRESCO.toString())))
            .andExpect(jsonPath("$.[*].siteId").value(hasItem(DEFAULT_SITE_ID.toString())))
            .andExpect(jsonPath("$.[*].siteGuid").value(hasItem(DEFAULT_SITE_GUID.toString())))
            .andExpect(jsonPath("$.[*].lowercaseRestrictions").value(hasItem(DEFAULT_LOWERCASE_RESTRICTIONS)))
            .andExpect(jsonPath("$.[*].uppercaseRestrictions").value(hasItem(DEFAULT_UPPERCASE_RESTRICTIONS)))
            .andExpect(jsonPath("$.[*].specialCharactersRestrictions").value(hasItem(DEFAULT_SPECIAL_CHARACTERS_RESTRICTIONS)))
            .andExpect(jsonPath("$.[*].digitsRestrictions").value(hasItem(DEFAULT_DIGITS_RESTRICTIONS)))
            .andExpect(jsonPath("$.[*].minimumLengthRestrictions").value(hasItem(DEFAULT_MINIMUM_LENGTH_RESTRICTIONS)))
            .andExpect(jsonPath("$.[*].maximumLengthRestriction").value(hasItem(DEFAULT_MAXIMUM_LENGTH_RESTRICTION)))
            .andExpect(jsonPath("$.[*].regexCorreoRestriction").value(hasItem(DEFAULT_REGEX_CORREO_RESTRICTION.toString())))
            .andExpect(jsonPath("$.[*].maximumAttempsRestriction").value(hasItem(DEFAULT_MAXIMUM_ATTEMPS_RESTRICTION)))
            .andExpect(jsonPath("$.[*].automaticLockEmail").value(hasItem(DEFAULT_AUTOMATIC_LOCK_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].manualLockEmail").value(hasItem(DEFAULT_MANUAL_LOCK_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].resetPasswordEmail").value(hasItem(DEFAULT_RESET_PASSWORD_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].passwordExpiresDays").value(hasItem(DEFAULT_PASSWORD_EXPIRES_DAYS)));
    }
    
    @Test
    @Transactional
    public void getGearOrganizationalUnit() throws Exception {
        // Initialize the database
        gearOrganizationalUnitRepository.saveAndFlush(gearOrganizationalUnit);

        // Get the gearOrganizationalUnit
        restGearOrganizationalUnitMockMvc.perform(get("/api/gear-organizational-units/{id}", gearOrganizationalUnit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearOrganizationalUnit.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.nodeIdAlfresco").value(DEFAULT_NODE_ID_ALFRESCO.toString()))
            .andExpect(jsonPath("$.siteId").value(DEFAULT_SITE_ID.toString()))
            .andExpect(jsonPath("$.siteGuid").value(DEFAULT_SITE_GUID.toString()))
            .andExpect(jsonPath("$.lowercaseRestrictions").value(DEFAULT_LOWERCASE_RESTRICTIONS))
            .andExpect(jsonPath("$.uppercaseRestrictions").value(DEFAULT_UPPERCASE_RESTRICTIONS))
            .andExpect(jsonPath("$.specialCharactersRestrictions").value(DEFAULT_SPECIAL_CHARACTERS_RESTRICTIONS))
            .andExpect(jsonPath("$.digitsRestrictions").value(DEFAULT_DIGITS_RESTRICTIONS))
            .andExpect(jsonPath("$.minimumLengthRestrictions").value(DEFAULT_MINIMUM_LENGTH_RESTRICTIONS))
            .andExpect(jsonPath("$.maximumLengthRestriction").value(DEFAULT_MAXIMUM_LENGTH_RESTRICTION))
            .andExpect(jsonPath("$.regexCorreoRestriction").value(DEFAULT_REGEX_CORREO_RESTRICTION.toString()))
            .andExpect(jsonPath("$.maximumAttempsRestriction").value(DEFAULT_MAXIMUM_ATTEMPS_RESTRICTION))
            .andExpect(jsonPath("$.automaticLockEmail").value(DEFAULT_AUTOMATIC_LOCK_EMAIL.toString()))
            .andExpect(jsonPath("$.manualLockEmail").value(DEFAULT_MANUAL_LOCK_EMAIL.toString()))
            .andExpect(jsonPath("$.resetPasswordEmail").value(DEFAULT_RESET_PASSWORD_EMAIL.toString()))
            .andExpect(jsonPath("$.passwordExpiresDays").value(DEFAULT_PASSWORD_EXPIRES_DAYS));
    }

    @Test
    @Transactional
    public void getNonExistingGearOrganizationalUnit() throws Exception {
        // Get the gearOrganizationalUnit
        restGearOrganizationalUnitMockMvc.perform(get("/api/gear-organizational-units/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearOrganizationalUnit() throws Exception {
        // Initialize the database
        gearOrganizationalUnitRepository.saveAndFlush(gearOrganizationalUnit);

        int databaseSizeBeforeUpdate = gearOrganizationalUnitRepository.findAll().size();

        // Update the gearOrganizationalUnit
        GearOrganizationalUnit updatedGearOrganizationalUnit = gearOrganizationalUnitRepository.findById(gearOrganizationalUnit.getId()).get();
        // Disconnect from session so that the updates on updatedGearOrganizationalUnit are not directly saved in db
        em.detach(updatedGearOrganizationalUnit);
        updatedGearOrganizationalUnit
            .name(UPDATED_NAME)
            .nodeIdAlfresco(UPDATED_NODE_ID_ALFRESCO)
            .siteId(UPDATED_SITE_ID)
            .siteGuid(UPDATED_SITE_GUID)
            .lowercaseRestrictions(UPDATED_LOWERCASE_RESTRICTIONS)
            .uppercaseRestrictions(UPDATED_UPPERCASE_RESTRICTIONS)
            .specialCharactersRestrictions(UPDATED_SPECIAL_CHARACTERS_RESTRICTIONS)
            .digitsRestrictions(UPDATED_DIGITS_RESTRICTIONS)
            .minimumLengthRestrictions(UPDATED_MINIMUM_LENGTH_RESTRICTIONS)
            .maximumLengthRestriction(UPDATED_MAXIMUM_LENGTH_RESTRICTION)
            .regexCorreoRestriction(UPDATED_REGEX_CORREO_RESTRICTION)
            .maximumAttempsRestriction(UPDATED_MAXIMUM_ATTEMPS_RESTRICTION)
            .automaticLockEmail(UPDATED_AUTOMATIC_LOCK_EMAIL)
            .manualLockEmail(UPDATED_MANUAL_LOCK_EMAIL)
            .resetPasswordEmail(UPDATED_RESET_PASSWORD_EMAIL)
            .passwordExpiresDays(UPDATED_PASSWORD_EXPIRES_DAYS);
        GearOrganizationalUnitDTO gearOrganizationalUnitDTO = gearOrganizationalUnitMapper.toDto(updatedGearOrganizationalUnit);

        restGearOrganizationalUnitMockMvc.perform(put("/api/gear-organizational-units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearOrganizationalUnitDTO)))
            .andExpect(status().isOk());

        // Validate the GearOrganizationalUnit in the database
        List<GearOrganizationalUnit> gearOrganizationalUnitList = gearOrganizationalUnitRepository.findAll();
        assertThat(gearOrganizationalUnitList).hasSize(databaseSizeBeforeUpdate);
        GearOrganizationalUnit testGearOrganizationalUnit = gearOrganizationalUnitList.get(gearOrganizationalUnitList.size() - 1);
        assertThat(testGearOrganizationalUnit.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearOrganizationalUnit.getNodeIdAlfresco()).isEqualTo(UPDATED_NODE_ID_ALFRESCO);
        assertThat(testGearOrganizationalUnit.getSiteId()).isEqualTo(UPDATED_SITE_ID);
        assertThat(testGearOrganizationalUnit.getSiteGuid()).isEqualTo(UPDATED_SITE_GUID);
        assertThat(testGearOrganizationalUnit.getLowercaseRestrictions()).isEqualTo(UPDATED_LOWERCASE_RESTRICTIONS);
        assertThat(testGearOrganizationalUnit.getUppercaseRestrictions()).isEqualTo(UPDATED_UPPERCASE_RESTRICTIONS);
        assertThat(testGearOrganizationalUnit.getSpecialCharactersRestrictions()).isEqualTo(UPDATED_SPECIAL_CHARACTERS_RESTRICTIONS);
        assertThat(testGearOrganizationalUnit.getDigitsRestrictions()).isEqualTo(UPDATED_DIGITS_RESTRICTIONS);
        assertThat(testGearOrganizationalUnit.getMinimumLengthRestrictions()).isEqualTo(UPDATED_MINIMUM_LENGTH_RESTRICTIONS);
        assertThat(testGearOrganizationalUnit.getMaximumLengthRestriction()).isEqualTo(UPDATED_MAXIMUM_LENGTH_RESTRICTION);
        assertThat(testGearOrganizationalUnit.getRegexCorreoRestriction()).isEqualTo(UPDATED_REGEX_CORREO_RESTRICTION);
        assertThat(testGearOrganizationalUnit.getMaximumAttempsRestriction()).isEqualTo(UPDATED_MAXIMUM_ATTEMPS_RESTRICTION);
        assertThat(testGearOrganizationalUnit.getAutomaticLockEmail()).isEqualTo(UPDATED_AUTOMATIC_LOCK_EMAIL);
        assertThat(testGearOrganizationalUnit.getManualLockEmail()).isEqualTo(UPDATED_MANUAL_LOCK_EMAIL);
        assertThat(testGearOrganizationalUnit.getResetPasswordEmail()).isEqualTo(UPDATED_RESET_PASSWORD_EMAIL);
        assertThat(testGearOrganizationalUnit.getPasswordExpiresDays()).isEqualTo(UPDATED_PASSWORD_EXPIRES_DAYS);
    }

    @Test
    @Transactional
    public void updateNonExistingGearOrganizationalUnit() throws Exception {
        int databaseSizeBeforeUpdate = gearOrganizationalUnitRepository.findAll().size();

        // Create the GearOrganizationalUnit
        GearOrganizationalUnitDTO gearOrganizationalUnitDTO = gearOrganizationalUnitMapper.toDto(gearOrganizationalUnit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearOrganizationalUnitMockMvc.perform(put("/api/gear-organizational-units")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearOrganizationalUnitDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearOrganizationalUnit in the database
        List<GearOrganizationalUnit> gearOrganizationalUnitList = gearOrganizationalUnitRepository.findAll();
        assertThat(gearOrganizationalUnitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearOrganizationalUnit() throws Exception {
        // Initialize the database
        gearOrganizationalUnitRepository.saveAndFlush(gearOrganizationalUnit);

        int databaseSizeBeforeDelete = gearOrganizationalUnitRepository.findAll().size();

        // Get the gearOrganizationalUnit
        restGearOrganizationalUnitMockMvc.perform(delete("/api/gear-organizational-units/{id}", gearOrganizationalUnit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearOrganizationalUnit> gearOrganizationalUnitList = gearOrganizationalUnitRepository.findAll();
        assertThat(gearOrganizationalUnitList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearOrganizationalUnit.class);
        GearOrganizationalUnit gearOrganizationalUnit1 = new GearOrganizationalUnit();
        gearOrganizationalUnit1.setId(1L);
        GearOrganizationalUnit gearOrganizationalUnit2 = new GearOrganizationalUnit();
        gearOrganizationalUnit2.setId(gearOrganizationalUnit1.getId());
        assertThat(gearOrganizationalUnit1).isEqualTo(gearOrganizationalUnit2);
        gearOrganizationalUnit2.setId(2L);
        assertThat(gearOrganizationalUnit1).isNotEqualTo(gearOrganizationalUnit2);
        gearOrganizationalUnit1.setId(null);
        assertThat(gearOrganizationalUnit1).isNotEqualTo(gearOrganizationalUnit2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearOrganizationalUnitDTO.class);
        GearOrganizationalUnitDTO gearOrganizationalUnitDTO1 = new GearOrganizationalUnitDTO();
        gearOrganizationalUnitDTO1.setId(1L);
        GearOrganizationalUnitDTO gearOrganizationalUnitDTO2 = new GearOrganizationalUnitDTO();
        assertThat(gearOrganizationalUnitDTO1).isNotEqualTo(gearOrganizationalUnitDTO2);
        gearOrganizationalUnitDTO2.setId(gearOrganizationalUnitDTO1.getId());
        assertThat(gearOrganizationalUnitDTO1).isEqualTo(gearOrganizationalUnitDTO2);
        gearOrganizationalUnitDTO2.setId(2L);
        assertThat(gearOrganizationalUnitDTO1).isNotEqualTo(gearOrganizationalUnitDTO2);
        gearOrganizationalUnitDTO1.setId(null);
        assertThat(gearOrganizationalUnitDTO1).isNotEqualTo(gearOrganizationalUnitDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearOrganizationalUnitMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearOrganizationalUnitMapper.fromId(null)).isNull();
    }
}
